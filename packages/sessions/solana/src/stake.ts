import {
	type AccountInfo,
	Authorized,
	Keypair,
	type ParsedAccountData,
	PublicKey,
	type Signer, StakeActivationData,
	StakeProgram,
} from "@solana/web3.js";
import {Buffer} from "buffer";
import {type IContext, type ISolanaSession} from "@uni-wc/provider";
import {type Logger} from '@walletconnect/logger';

interface StakeAccount {
	pubkey: PublicKey;
	account: AccountInfo<Buffer | ParsedAccountData>;
	status: StakeActivationData;
}

export class AccountNotFound extends Error {
	public pk: PublicKey
	constructor(pk: PublicKey) {
		super(`Account not found ${pk.toString()}`);
		this.name = "AccountNotFound";
		this.pk = pk;
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AccountNotFound);
		}
	}
}

export interface IStake {
	stakedAccounts(): Array<StakeAccount>

	stake(lamports: number, signer: Signer | undefined): Promise<string>;

	deactivate(stakeAccount: PublicKey): Promise<string>;

	withdraw(stakeAccount: PublicKey): Promise<string>;

	delegate(stakeAccount: PublicKey, voteKey: PublicKey): Promise<string>;

	balance(): number;
}

export class Stake implements IStake {
	session: ISolanaSession;
	readonly logger: Logger;
	readonly dryRun: boolean;
	private _stakedAccounts: Array<StakeAccount>;

	private constructor(ctx: IContext, session: ISolanaSession, stakedAccounts: Array<StakeAccount>) {
		this.session = session;
		this._stakedAccounts = stakedAccounts
		this.dryRun = ctx.dryRun;
		this.logger = ctx.logger.child({ context : "solana-staker"});
	}

	public static async init(session: ISolanaSession, ctx: IContext): Promise<Stake> {
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
		const statkeAccounts : StakeAccount[] = [];
		for (const a of accounts) {
			statkeAccounts.push({
				pubkey: a.pubkey,
				account: a.account,
				status: await session.connection.getStakeActivation(a.pubkey)
			})
		}
		ctx.logger.debug(`Got ${accounts.length} staked accounts`);
		return new Stake(ctx, session, statkeAccounts);
	}

	stakedAccounts(): Array<StakeAccount> {
		return this._stakedAccounts;
	}


	balance(): number {
		let total = 0;
		for (const account of this.stakedAccounts()) {
			total += account.account.lamports;
		}
		return total
	}

	async stake(lamports: number, acct: Signer | undefined): Promise<string> {
		acct = acct ? acct : Keypair.generate();
		const createStakeAccountTx = StakeProgram.createAccount({
			authorized: new Authorized(this.session.account, this.session.account),
			fromPubkey: this.session.account,
			lamports: lamports,
			stakePubkey: acct.publicKey,
		});
		const sig = await this.session.sendAndConfirm(createStakeAccountTx.instructions, [acct]);
		for  (let i = 0; i < 4; i++) {
			this.logger.debug(`checking account ${acct.publicKey.toString()}`)
			await new Promise(resolve => setTimeout(resolve, 3000));
			try {
				const a = await this.session.connection.getAccountInfo(acct.publicKey, "confirmed");
				if (a) {
					const status = await this.session.connection.getStakeActivation(acct.publicKey);
					this._stakedAccounts.push({pubkey: acct.publicKey, account: a, status});
					return sig;
				}
			} catch (e) {
				this.logger.debug(e);
			}
		}
		throw new AccountNotFound(acct.publicKey);
	}

	async delegate(stakeAccount: PublicKey, voteKey: PublicKey): Promise<string> {
		const delegateTx = StakeProgram.delegate({
			stakePubkey: stakeAccount,
			authorizedPubkey: this.session.account,
			votePubkey: voteKey
		});
		return this.session.sendAndConfirm(delegateTx.instructions, undefined);
	}


	async deactivate(stakeAccount: PublicKey): Promise<string> {

		const tx = StakeProgram.deactivate({
			stakePubkey: stakeAccount,
			authorizedPubkey: this.session.account,
		});
		return this.session.sendAndConfirm(tx.instructions, undefined);
	}

	async withdraw(stakeAccount: PublicKey): Promise<string> {
		const account = this.stakedAccounts().find((a) => a.pubkey == stakeAccount);
		if (!account) {
			throw new Error(`account not found ${stakeAccount.toString()}`);
		}
		const tx = StakeProgram.withdraw({
				stakePubkey: stakeAccount,
				authorizedPubkey: this.session.account,
				toPubkey: this.session.account,
				lamports: account.account.lamports,
			}
		);
		const sig = this.session.sendAndConfirm(tx.instructions, undefined);
		this._stakedAccounts = this._stakedAccounts.filter((a) => a.pubkey.toString() != account.pubkey.toString());
		return sig;
	}
}
