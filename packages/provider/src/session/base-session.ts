import type {IContext} from "../factory";
import type {Logger} from "@walletconnect/logger";
import type {IProvider} from "@walletconnect/universal-provider";
import type {Chain} from "@uni-wc/chains";

export class BaseSession {
	readonly context: IContext;
	readonly logger: Logger;
	readonly session: IProvider;
	readonly topic: string;
	readonly chain: Chain;

	constructor(chain: Chain, session: IProvider, topic: string, context: IContext) {
		if (session.requestAccounts().length == 0) {
			throw new Error("No Accounts/Pubkeys available");
		}
		this.chain = chain;
		this.session = session;
		this.topic = topic;
		this.context = context;
		this.logger = context.logger;
	}
}
