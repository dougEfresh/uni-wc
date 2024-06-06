import {PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import {ISolanaSession} from "@uni-wc/provider";

export interface ITransactionSession {
	send(to: PublicKey, lamports: number): Promise<string>;
}

export class TransactionSession implements ITransactionSession{
	readonly session: ISolanaSession;
	constructor(sesion: ISolanaSession) {
		this.session = sesion;
	}

	async send(to: PublicKey, lamports: number): Promise<string> {
		const intx = SystemProgram.transfer({
			fromPubkey: this.session.account,
			lamports: lamports,
			toPubkey: to
		})
		const tx = await this.session.signTransaction([intx]);
		const sig = await this.session.connection.sendRawTransaction(tx.serialize(), {
			maxRetries: 5,
		});
		return sig;
	}


}
