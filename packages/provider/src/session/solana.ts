import {
	Transaction,
	Connection,
	PublicKey,
	TransactionInstruction, type SignatureResult, ComputeBudgetProgram, type Signer
} from '@solana/web3.js';
import {type Chain} from "@uni-wc/chains";
import bs58 from 'bs58';
import {type IContext} from "../factory";
import { type Logger } from "@walletconnect/logger";
import {DryRunModeError} from "./error";
import {type IProvider} from "@walletconnect/universal-provider";

export interface ISolanaSession {
	signMessage(msg: string): Promise<string>;
	signTransaction(txin: TransactionInstruction[]): Promise<Transaction>;
	sendAndConfirm(tx: TransactionInstruction[], kp: Signer | undefined): Promise<string>;
	connection: Connection;
	chain: Chain;
	account: PublicKey
}



interface MessageResponse {
	signature: string
}

export class SolanaSession implements ISolanaSession{
	readonly chain: Chain;
	readonly account: PublicKey;
	readonly connection: Connection;
	readonly maxFeeMicroLamports: number;
	readonly context: IContext;
	readonly logger: Logger;
	readonly session: IProvider;
	readonly topic: string;

	constructor(chain: Chain, session: IProvider, topic: string, context: IContext) {
		if (!session.requestAccounts() || session.requestAccounts().length == 0) {
			throw new Error("no sessions accounts available");
		}
		this.chain = chain;
		this.account = new PublicKey(session.requestAccounts()[0]);
		if ("custom" in chain.vchain.rpcUrls) {
			this.connection = new Connection(chain.vchain.rpcUrls["custom"].http[0]);
		} else {
			// TODO check url
			this.connection = new Connection(chain.vchain.rpcUrls.default.http[0]);
		}
		this.maxFeeMicroLamports = 10000;
		this.context = context;
		this.logger = context.logger.child({context: "session-solana"});
		this.session = session;
		this.topic = topic;
	}

	async signMessage(msg: string): Promise<string> {
		const encoded = bs58.encode(Buffer.from(msg));
		let sig: MessageResponse = await this.session.request({
			topic: this.topic,
			chainId: this.chain.id,
			request: {
				method: "solana_signMessage",
				params: {
					message: encoded,
					pubkey: this.account.toString()
				}
			}
		});
		return Promise.resolve(sig.signature);
	}

	async signTransaction(txin: TransactionInstruction[]): Promise<Transaction> {
		const hash = await this.connection.getLatestBlockhash();
		const tx = new Transaction();
		tx.recentBlockhash = hash.blockhash;
		tx.lastValidBlockHeight = hash.lastValidBlockHeight;
		tx.feePayer = this.account;
		for (const instruction of txin) {
			tx.add(instruction);
		}
		this.logger.debug(tx);
		const serializedTransaction = tx.serialize({
			requireAllSignatures: false,
			verifySignatures: false,
		}).toString('base64');
		const sig: MessageResponse = await this.session.request({
			topic: this.topic,
			chainId: this.chain.id,
			request: {
				method: "solana_signTransaction",
				params: {
					transaction: serializedTransaction
				}
			}
		});
		this.logger.debug(`got back sig ${sig.signature}`);
		const decoded = bs58.decode(sig.signature);
		const buf = Buffer.from(decoded);
		if (buf.length != 64) {
			throw new Error(`invalid buffer: ${sig.signature}  ${buf.length}` );
		}
		tx.addSignature(this.account, buf);
		return Promise.resolve(tx);
	}


	async computeFee(): Promise<number> {
		const prioritizationFeeObjects = await this.connection.getRecentPrioritizationFees();
		if (prioritizationFeeObjects.length === 0) {
			this.logger.info('No prioritization fee data available.');
			return this.maxFeeMicroLamports / 2;
		}
		// Calculate the average including zero fees
		const averageFeeIncludingZeros = prioritizationFeeObjects.length > 0
			? Math.floor(prioritizationFeeObjects.reduce((acc, feeObject) => acc + feeObject.prioritizationFee, 0) / prioritizationFeeObjects.length)
			: 0;

		// Filter out prioritization fees that are equal to 0 for other calculations
		const nonZeroFees = prioritizationFeeObjects
			.map(feeObject => feeObject.prioritizationFee)
			.filter(fee => fee !== 0);
		// Calculate the average of the non-zero fees
		const averageFeeExcludingZeros = nonZeroFees.length > 0
			? Math.floor(nonZeroFees.reduce((acc, fee) => acc + fee, 0) / nonZeroFees.length )
			: 0;

		// Calculate the median of the non-zero fees
		const sortedFees = nonZeroFees.sort((a, b) => a - b);
		let medianFee = 0;
		if (sortedFees.length > 0) {
			const midIndex = Math.floor(sortedFees.length / 2);
			medianFee = sortedFees.length % 2 !== 0
				? sortedFees[midIndex]
				: Math.floor((sortedFees[midIndex - 1] + sortedFees[midIndex]) / 2);
		}

		this.logger.debug(`Average Prioritization Fee (including slots with zero fees): ${averageFeeIncludingZeros} micro-lamports.`);
		this.logger.debug(`Average Prioritization Fee (excluding slots with zero fees): ${averageFeeExcludingZeros} micro-lamports.`);
		this.logger.debug(`Median Prioritization Fee (excluding slots with zero fees): ${medianFee} micro-lamports.`);

		let fee = Math.min(medianFee, this.maxFeeMicroLamports);
		if (averageFeeExcludingZeros > medianFee) {
			fee = Math.min(averageFeeExcludingZeros, this.maxFeeMicroLamports)
		}
		this.logger.info(`returning fee ${fee}`);
		return fee;
	}

	async sendAndConfirm(tx: TransactionInstruction[], kp: Signer | undefined): Promise<string> {
		const fee = ComputeBudgetProgram.setComputeUnitPrice({
			microLamports: await this.computeFee()
		});
		const feeWithTransaction = [fee, ...tx];
		const signed = await this.signTransaction(feeWithTransaction);
		if (kp) {
			signed.partialSign(kp);
		}
		if (this.context.dryRun) {
			throw new DryRunModeError(signed);
		}
		const sig = await this.connection.sendRawTransaction(signed.serialize(), {
			maxRetries: 5,
		});
		if (
			signed.recentBlockhash != null &&
			signed.lastValidBlockHeight != null
		) {
			let status: SignatureResult;
			status = (await this.connection.confirmTransaction({
				signature: sig,
				blockhash: signed.recentBlockhash!,
				lastValidBlockHeight: signed.lastValidBlockHeight,
			}, "confirmed")).value;
			if (status.err) {
				throw new Error(
					`Transaction ${sig} failed (${JSON.stringify(status)})`,
				);
			}
		}
		return sig;
	}
}
