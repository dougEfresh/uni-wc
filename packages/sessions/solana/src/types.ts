import {AccountInfo, ParsedAccountData, PublicKey} from "@solana/web3.js";

export type Account = {
	pubkey: PublicKey;
	account: AccountInfo<ParsedAccountData>;
}
