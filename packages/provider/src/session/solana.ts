import {Transaction, Connection, PublicKey, SystemProgram, Message, TransactionMessage} from '@solana/web3.js';
import {Chain} from "@uni-wc/chains";
import UniversalProvider from "@walletconnect/universal-provider";
import SolanaProvider from "@walletconnect/universal-provider/dist/types/providers/solana";
import bs58 from 'bs58';
import {UniversalProviderFactory} from "../factory.js";
import { createJupiterApiClient, DefaultApi as JupApi } from '@jup-ag/api';
//import { SolendMarket } from '@solendprotocol/solend-sdk';


export interface ISolanaSession {
	signMessage(msg: string): Promise<string>;
	signTransaction(t: Transaction): Promise<string>;
	sendSol(to: string, lamports: number): Promise<string>;
	connection: Connection;
	chain: Chain;
	account: PublicKey
	jup: JupApi,
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
	readonly jup: JupApi;

	constructor(chain: Chain, provider: UniversalProvider) {
		this.chain = chain;
		const walletConnectProvider: SolanaProvider | undefined = provider.rpcProviders['solana'] as SolanaProvider;
		if (!walletConnectProvider || walletConnectProvider.requestAccounts().length == 0) {
			throw new Error("no account for solana found");
		}
		this.account = new PublicKey(walletConnectProvider.requestAccounts()[0]);
		// TODO check url
		this.connection = new Connection(chain.vchain.rpcUrls.default.http[0]);
		this.jup = createJupiterApiClient({});
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

	async sendSol(to: string, lampport: number) {
		const hash = await this.connection.getLatestBlockhash("confirmed");
		let ix = SystemProgram.transfer({
			fromPubkey: this.account,
			toPubkey: new PublicKey(to),
			lamports: lampport,

		});
		const msg = new TransactionMessage({
			instructions: [ix],
			payerKey: this.account,
			recentBlockhash: hash.blockhash,
		})
		var tx = Transaction.populate(msg.compileToLegacyMessage());
		return this.signTransaction(tx);
	}

	async signTransaction(tx: Transaction): Promise<string> {
		const provider = await UniversalProviderFactory.getProvider();

		const serializedTransaction = tx.serialize({
			requireAllSignatures: false
		}).toString('base64');
		const sig = await provider.request({
			method: "solana_signTransaction",
			params: {
				transaction: serializedTransaction
			}
		}, this.chain.id)

		return Promise.resolve(sig as string);
	}

}
