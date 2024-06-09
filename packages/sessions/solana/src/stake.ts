import {
	AccountInfo,
	Authorized, ComputeBudgetProgram,
	Keypair,
	ParsedAccountData,
	PublicKey, SignatureResult,
	Signer,
	StakeProgram,
	Transaction
} from "@solana/web3.js";
import {Buffer} from "buffer";
import {ISolanaSession} from "@uni-wc/provider";
import {sign} from "viem/accounts";

export interface IStake {
	stakedAccounts: Array<{
		pubkey: PublicKey;
		account: AccountInfo<Buffer | ParsedAccountData>;
	}>;

	stake(lamports: number, signer: Signer | undefined): Promise<string>;

	deactivate(stakeAccount: PublicKey): Promise<string>;

	withdraw(stakeAccount: PublicKey): Promise<string>;

	delegate(stakeAccount: PublicKey, voteKey: PublicKey): Promise<string>;

	balance(): number;
}

export class Stake implements IStake {
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

	async setAccounts() {
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

	async stake(lamports: number, signer: Signer | undefined): Promise<string> {
		const sa = Keypair.generate();
		const createStakeAccountTx = StakeProgram.createAccount({
			authorized: new Authorized(this.session.account, this.session.account),
			fromPubkey: this.session.account,
			lamports: lamports,
			stakePubkey: sa.publicKey,
		});
		const sig = await this.session.sendAndConfirm(createStakeAccountTx.instructions, sa);
		await this.setAccounts();
		return sig;
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
		const account = this.stakedAccounts.find((a) => a.pubkey == stakeAccount);
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
		return this.session.sendAndConfirm(tx.instructions, undefined);
	}
}
