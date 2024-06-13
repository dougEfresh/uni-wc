import type {Chain} from "@uni-wc/chains";
import {BaseSession} from "./base-session";
import type {IProvider} from "@walletconnect/universal-provider";
import type {IContext} from "../factory";

export interface ICosmosSession {
	signDirect(): Promise<string>;
	chain: Chain;
	account: string;
}

export class CosmosSession extends BaseSession implements ICosmosSession {
	readonly account: string;

	constructor(chain: Chain, session: IProvider, topic: string, context: IContext) {
		super(chain, session, topic, context);
		this.account = session.requestAccounts()[0];
	}

	signDirect(): Promise<string> {
		return Promise.resolve("");
	}


}
