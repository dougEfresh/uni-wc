import {AccountInfo, ParsedAccountData} from '@solana/web3.js';
import {Buffer} from "buffer";

export {type ITransactionSession, TransactionSession } from './transaction.js';

export interface Balance {
	account: Array<AccountInfo<Buffer | ParsedAccountData>>
	total: number;
}


export {type IStake, Stake } from './stake.js';
