import {PublicKey, SystemProgram} from "@solana/web3.js";
import {type ISolanaSession} from "@uni-wc/provider";

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
		return this.session.sendAndConfirm([intx], undefined);
	}
}
