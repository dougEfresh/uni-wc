import type {IContext, ISolanaSession} from "@uni-wc/provider";
import type {Logger} from "@walletconnect/logger";

export abstract class BaseSession {
	session: ISolanaSession;
	readonly logger: Logger;
	readonly dryRun: boolean;

	constructor(session: ISolanaSession, ctx: IContext, name: string) {
		this.session = session;
		this.dryRun = ctx.dryRun;
		this.logger = ctx.logger.child({ context : name});
	}

}
