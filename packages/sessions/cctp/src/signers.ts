import {Chain, network, SignAndSendSigner, TxHash} from "@wormhole-foundation/sdk";
import {IContext, IEipSession, ISolanaSession} from "@uni-wc/provider";
import {UnsignedTransaction} from "@wormhole-foundation/sdk";
import {SolanaUnsignedTransaction} from "@wormhole-foundation/sdk-solana";

import {Signer, Transaction} from "@solana/web3.js";
import {Logger} from "pino";
import {
	type Address,
	PrepareTransactionRequestParameters,
	SendTransactionReturnType,
} from "viem";
import {EvmUnsignedTransaction} from "@wormhole-foundation/sdk-evm";
import {chainToWormhole} from "./cctp";


export class EipWormholeSigner<N extends network.Network, C extends Chain> implements SignAndSendSigner<N, C> {
	readonly session: IEipSession;
	readonly logger: Logger
	private readonly _chain: Chain;

	constructor(ctx: IContext, session: IEipSession) {
		this.session = session;
		this.logger = ctx.logger.child({context: "eip-wormhole"});
		this._chain = chainToWormhole(session.chain.id);
	}
	address(): string {
		return this.session.account.toString();
	}

	chain(): C {
		return this._chain as C;
	}

	async signAndSend(transactions: UnsignedTransaction[]): Promise<TxHash[]> {
		await this.session.wc.switchChain({id: this.session.chain.vchain.id});
		const signed: string[] = [];
		for (const txn of transactions) {
			const evmUnsignedTransaction : EvmUnsignedTransaction<any, any> = txn as EvmUnsignedTransaction<any, any>;
			const ethersTransaction = evmUnsignedTransaction.transaction;
			const { transaction, description } = txn;
			const prepare: PrepareTransactionRequestParameters =  {
				account: transaction.account as Address,
				to: ethersTransaction.to as Address,
				data: ethersTransaction.data as Address,
				chain: this.session.chain.vchain,
				accessList: transaction.accessList,
				kzg: transaction.kzg,
				parameters: transaction.parameters,
				value: transaction.value,
				blobs: transaction.blobs
			};


			try {
				this.logger.debug(`Signing: ${description} for ${this.address()} chain=${this.session.chain.vchain.name} wormholeChain=${this._chain} 
				account=${transaction.from} to=${transaction.to} maxFeePerGas=${prepare.maxPriorityFeePerGas}  maxFeePerGas=${prepare.maxFeePerGas}  ${prepare.accessList} description=${description}`);
					const request = await this.session.pc.prepareTransactionRequest(prepare);
					this.logger.debug(`got fees from prepareTransactionRequest maxPriorityFeePerGas=${request.maxPriorityFeePerGas} maxFeePerGas=${request.maxFeePerGas}`);
					const sig: SendTransactionReturnType = await this.session.wc.sendTransaction({
						account: this.session.account,
						to: request.to,
						chain: this.session.chain.vchain,
						data: request.data,
						maxFeePerGas: request.maxFeePerGas,
						maxPriorityFeePerGas: request.maxPriorityFeePerGas,
					});
					this.logger.info(`Got sig ${sig}`);
					signed.push(sig);
				} catch (e) {
					this.logger.error(e);
					throw e;
				}
				break;
			}
		return signed;
	}
}

export class SolanaWormholeSigner<N extends network.Network, C extends Chain> implements SignAndSendSigner<N, C> {
	readonly session: ISolanaSession;
	readonly logger: Logger

	constructor(ctx: IContext, session: ISolanaSession) {
		this.session = session;
		this.logger = ctx.logger.child({context: "solana-wormhole"});
	}

	address(): string {
		return this.session.account.toString();
	}

	chain(): C {
		return 'Solana' as C;
	}

	async signAndSend(transactions: UnsignedTransaction[]): Promise<TxHash[]> {
		const txids: TxHash[] = [];
		this.logger.debug(`Got ${transactions.length} transactions to sign`);
		const solTxs: SolanaUnsignedTransaction<any>[] = [];
		for (const atx of transactions) {
			solTxs.push(atx as SolanaUnsignedTransaction<any>);
		}
		for (const tx of solTxs) {
			const solTx = (tx.transaction.transaction as Transaction);
			const sig = await this.session.sendAndConfirm(solTx.instructions, tx.transaction.signers as Signer[]);
			txids.push(sig);
		}
		return txids;
	}
}


