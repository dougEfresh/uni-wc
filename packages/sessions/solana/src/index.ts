import {
	AccountInfo,
	Authorized,
	Keypair, ParsedAccountData,
	PublicKey,
	sendAndConfirmTransaction,
	StakeProgram,
	SystemProgram,
	Transaction
} from '@solana/web3.js';
import {ISolanaSession} from '@uni-wc/provider';
import {Buffer} from "buffer";

export {type ITransactionSession, TransactionSession } from './transaction.js';

export interface Balance {
	account: Array<AccountInfo<Buffer | ParsedAccountData>>
	total: number;
}

export interface IStake {
	stakedAccounts: Array<{
		pubkey: PublicKey;
		account: AccountInfo<Buffer | ParsedAccountData>;
	}>;
	stake(stakeAccount: PublicKey | undefined, lamports: number): Promise<string>;
	balance(): number;
}

export class Stake implements IStake{
	session: ISolanaSession;
	readonly stakedAccounts: Array<{
		pubkey: PublicKey;
		account: AccountInfo<Buffer | ParsedAccountData>;
	}>;

	private constructor(session: ISolanaSession, stakedAccounts: Array<{
		pubkey: PublicKey;
		account: AccountInfo<Buffer | ParsedAccountData>;
	}>) {
		this.session = session;
		this.stakedAccounts = stakedAccounts;
	}

	public static async init(session: ISolanaSession): Promise<Stake> {
		const accounts = await session.connection.getParsedProgramAccounts(
			StakeProgram.programId,
			{
				filters: [
					{
						memcmp: {
							offset: 12,
							bytes: session.account.toBase58()
						},
					},
				],
			},
		);

		return new Stake(session, accounts);
	}

	async setAccounts(){
		const accounts = await this.session.connection.getParsedProgramAccounts(
			StakeProgram.programId,
			{
				filters: [
					{
						memcmp: {
							offset: 12,
							bytes: this.session.account.toBase58()
						},
					},
				],
			},
		);

	}

	balance(): number {
		let total = 0;
		for (const account of this.stakedAccounts) {
			total += account.account.lamports;
		}
		return total
	}

	async stake(stakeAccount: PublicKey | undefined, lamports: number): Promise<string> {
		const sa = stakeAccount ? stakeAccount : Keypair.generate().publicKey;
		const acct = await this.session.connection.getAccountInfo(sa);
		if (acct) {
			throw new Error(`count ${sa.toString()} already exists`);
		}
		const createStakeAccountTx = StakeProgram.createAccount({
			authorized: new Authorized(this.session.account, this.session.account),
			fromPubkey: this.session.account,
			lamports: lamports,
			stakePubkey: sa
		});
		createStakeAccountTx.feePayer = this.session.account;
		const sig = await this.session.signTransaction(createStakeAccountTx.instructions);
		//createStakeAccountTx.addSignature(this.session.account, Buffer.from(sig, 'base64'));
		await this.setAccounts();
		return "";
	}

}


