import {
	Transaction,
	Connection,
	PublicKey,
	SystemProgram,
	Message,
	TransactionMessage,
	TransactionInstruction
} from '@solana/web3.js';
import {Chain} from "@uni-wc/chains";
import UniversalProvider from "@walletconnect/universal-provider";
import SolanaProvider from "@walletconnect/universal-provider/dist/types/providers/solana";
import bs58 from 'bs58';
import {UniversalProviderFactory} from "../factory.js";
//import { createJupiterApiClient, DefaultApi as JupApi } from '@jup-ag/api';
//import { SolendMarket } from '@solendprotocol/solend-sdk';


export interface ISolanaSession {
	signMessage(msg: string): Promise<string>;
	signTransaction(txin: TransactionInstruction[]): Promise<Transaction>;
	recentHash(): Promise<string>;
	connection: Connection;
	chain: Chain;
	account: PublicKey
}

interface MessageResponse {
	signature: string
}

interface SolanaTransaction {
	transaction: string,
}

export class SolanaSession implements ISolanaSession{
	readonly chain: Chain;
	readonly account: PublicKey;
	readonly connection: Connection;

	constructor(chain: Chain, provider: UniversalProvider) {
		this.chain = chain;
		const walletConnectProvider: SolanaProvider | undefined = provider.rpcProviders['solana'] as SolanaProvider;
		if (!walletConnectProvider || walletConnectProvider.requestAccounts().length == 0) {
			throw new Error("no account for solana found");
		}
		this.account = new PublicKey(walletConnectProvider.requestAccounts()[0]);
		// TODO check url
		this.connection = new Connection(chain.vchain.rpcUrls.default.http[0]);
	}

	async signMessage(msg: string): Promise<string> {
		const encoded = bs58.encode(Buffer.from(msg));
		const provider = await UniversalProviderFactory.getProvider();
		let sig: MessageResponse = await provider.request({
			method: "solana_signMessage",
			params: {
				message: encoded,
				pubkey: this.account.toString()
			}
		}, this.chain.id);
		return Promise.resolve(sig.signature);
	}

	async signTransaction(txin: TransactionInstruction[]): Promise<Transaction> {
		const provider = await UniversalProviderFactory.getProvider();
		const hash = await this.recentHash();
		const tx = new Transaction();
		tx.recentBlockhash = hash;
		tx.feePayer = this.account;
		tx.add(...txin);
		const serializedTransaction = tx.serialize({
			requireAllSignatures: false,
			verifySignatures: false,
		}).toString('base64');
		if (!tx.recentBlockhash) {
			throw new Error("HASH HASH");
		}
		const sig: MessageResponse = await provider.request({
			method: "solana_signTransaction",
			params: {
				transaction: serializedTransaction
			}
		}, this.chain.id)
		const decoded = bs58.decode(sig.signature);
		const buf = Buffer.from(decoded);
		if (buf.length != 64) {
			throw new Error(`invalid buffer: ${sig.signature}  ${buf.length}` );
		}
		tx.addSignature(this.account, buf);
		return Promise.resolve(tx);
	}

	async recentHash(): Promise<string> {
		const h = await this.connection.getLatestBlockhash();
		return Promise.resolve(h.blockhash);
	}


}
