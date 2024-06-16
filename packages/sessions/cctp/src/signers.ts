import {Chain, network, SignAndSendSigner, SignedTx, SignOnlySigner, TxHash} from "@wormhole-foundation/sdk-connect";
import {IContext, IEipSession, ISolanaSession} from "@uni-wc/provider";
import {UnsignedTransaction} from "@wormhole-foundation/sdk-definitions";
import {SolanaUnsignedTransaction} from "@wormhole-foundation/sdk-solana";

import {Signer, Transaction} from "@solana/web3.js";
import {Logger} from "pino";
import {type Address, PrepareTransactionRequestParameters} from "viem";
import {EvmUnsignedTransaction} from "@wormhole-foundation/sdk-evm";

import {Chain as Vchain} from 'viem';


interface ViewRequest {
	account: Address,
	to:  Address,
	data: any,
	chain: Vchain,
	value?: bigint
}

export class EipWormholeSigner<N extends network.Network, C extends Chain> implements SignOnlySigner<N, C> {
	readonly session: IEipSession;
	readonly logger: Logger
	private _chain: Chain;

	constructor(ctx: IContext, session: IEipSession) {
		this.session = session;
		this.logger = ctx.logger.child({context: "eip-wormhole"});
		this._chain = 'BaseSepolia';
	}
	address(): string {
		return this.session.account.toString();
	}

	chain(): C {
		return this._chain as C;
	}

	async sign(tx: UnsignedTransaction<N, C>[]): Promise<SignedTx[]> {
		const chain = this.chain();

		const signed = [];

		// Default gas values
		let gasLimit = 500_000n;
		let gasPrice = 100_000_000_000n; // 100gwei
		let maxFeePerGas = 1_500_000_000n; // 1.5gwei
		let maxPriorityFeePerGas = 100_000_000n; // 0.1gwei

		// If no overrides were passed, we can get better
		// gas values from the provider
		/*
		if (this.opts?.overrides === undefined) {
			// Celo does not support this call
			if (chain !== 'Celo') {
				const feeData = await this._signer.provider!.getFeeData();
				gasPrice = feeData.gasPrice ?? gasPrice;
				maxFeePerGas = feeData.maxFeePerGas ?? maxFeePerGas;
				maxPriorityFeePerGas =
					feeData.maxPriorityFeePerGas ?? maxPriorityFeePerGas;
			}
		}
		 */

		/*
		if (this.opts?.maxGasLimit !== undefined) {
			// why doesnt math.min work for bigints?
			gasLimit =
				gasLimit > this.opts?.maxGasLimit ? this.opts?.maxGasLimit : gasLimit;
		}
		 */

		for (const txn of tx) {
			const evmUnsignedTransaction : EvmUnsignedTransaction<any, any> = txn as EvmUnsignedTransaction<any, any>;
			const ethersTransaction = evmUnsignedTransaction.transaction;
			const { transaction, description } = txn;
			this.logger.debug(`Signing: ${description} for ${this.address()} chain=${this.session.chain.vchain.name} value=${transaction.value} account=${transaction.from} type=${transaction.type} to=${transaction.to} accessList=${transaction.accessList}`);
			const prepare: PrepareTransactionRequestParameters =  {
				account: transaction.account as Address,
				to: ethersTransaction.to as Address,
				data: ethersTransaction.data as Address,
				chain: this.session.chain.vchain,
			}
			const request = await this.session.wc.prepareTransactionRequest( prepare);
			const sig = await this.session.wc.signTransaction({
				account: this.session.account,
				...request
			});
			signed.push(sig);
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


