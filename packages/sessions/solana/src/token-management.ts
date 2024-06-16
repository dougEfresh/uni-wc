import {BaseSession} from "./base-session";
import {type IContext, type ISolanaSession} from "@uni-wc/provider";
import {
	AccountLayout,
	createAssociatedTokenAccountInstruction,
	getAssociatedTokenAddress,
	RawAccount,
	TOKEN_2022_PROGRAM_ID,
	TOKEN_PROGRAM_ID, createTransferInstruction
} from "@solana/spl-token";
import {PublicKey, TransactionInstruction} from "@solana/web3.js";
import {type IKeyValueStorage} from "@walletconnect/keyvaluestorage";

export interface TokenInfo {
	tokenAccount: PublicKey,
	info: RawAccount,
	programId: PublicKey,
	meta?: JupToken,
}

interface JupToken {
	address: string;
	chainId: number;
	decimals: number;
	name: string;
	symbol: string;
	logoURI: string;
}

class NoopStorage implements IKeyValueStorage {
	getEntries<T = any>(): Promise<[string, T][]> {
		return Promise.resolve([]);
	}

	getItem<T = any>(key: string): Promise<T | undefined> {
		return Promise.resolve(undefined);
	}

	getKeys(): Promise<string[]> {
		return Promise.resolve([]);
	}

	removeItem(key: string): Promise<void> {
		return Promise.resolve(undefined);
	}

	setItem<T = any>(key: string, value: T): Promise<void> {
		return Promise.resolve(undefined);
	}

}
async function fetchTokens(): Promise<JupToken[]> {
	/*
	const response = await fetch('https://token.jup.ag/strict');
	const data = await response.json() as JupToken[];
	return data;
	 */
	return [];
}

export class TokenManagement extends BaseSession{

	readonly storage: IKeyValueStorage;

	constructor(ctx: IContext, session: ISolanaSession, storage?: IKeyValueStorage| undefined) {
		super(session, ctx, "token-management");
		this.storage = !storage ? new NoopStorage() : storage;
	}

	async tokens(): Promise<TokenInfo[]> {
		const tokens: TokenInfo[] = [];
		const jupTokens = await fetchTokens();
		//TODO cache
		for (const program of [TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID]) {
			const tokenAccount = await this.session.connection.getTokenAccountsByOwner(this.session.account, {
				programId: program
			});
			if (!tokenAccount.value) {
				throw new Error(`failed to get accounts for programId ${TOKEN_PROGRAM_ID}`);
			}
			const tokenAccountInfo: TokenInfo[] = tokenAccount.value.map((value) => (
			 {
				 tokenAccount: value.pubkey,
				 info: AccountLayout.decode(value.account.data),
				 programId: program,
				 meta:  jupTokens.find((t) => t.address == value.pubkey.toString())
				}
		));
			tokens.push(...tokenAccountInfo);
		}
		return tokens;
	}

	public async transfer(to: PublicKey, token: TokenInfo, amount: bigint): Promise<string> {
		const senderAccount = await getAssociatedTokenAddress(token.info.mint, to, false, token.programId);
		const onChain = await this.session.connection.getAccountInfo(senderAccount);
		const instructions: TransactionInstruction[] = [];
		if (!onChain) {
			instructions.push(createAssociatedTokenAccountInstruction(this.session.account, senderAccount, to, token.info.mint, token.programId));
		}
		instructions.push(createTransferInstruction(token.tokenAccount, senderAccount, this.session.account, amount, undefined, token.programId));
		return this.session.sendAndConfirm(instructions, undefined);
	}
}
