import { UniversalProvider, default as Provider, type UniversalProviderOpts }   from '@walletconnect/universal-provider';
import {type ISessionFactory, SessionFactory} from "./session";
import {getDefaultLoggerOptions, type Logger} from "@walletconnect/logger";
import {SignClient, default as ISignClient} from "@walletconnect/sign-client";
import {pino} from 'pino';
const  RELAY_URL = "wss://relay.walletconnect.com";

export interface IContext {
	dryRun: boolean,
	logger: Logger,
}

interface ProviderOpts extends UniversalProviderOpts {
	disableRequestQueue?: boolean,
	dryRun: boolean,
	sessionProposalCallback: (uri: string) => Promise<void>
}

export class UniversalProviderFactory {
	protected static provider: Provider;
	protected static session: ISessionFactory;
	protected static providerOpts: ProviderOpts;
	public static context: IContext;

	public static configure(providerOpts: ProviderOpts) {
		UniversalProviderFactory.providerOpts = providerOpts;
	}

	public static async getProvider() {
		if (!UniversalProviderFactory.provider) await UniversalProviderFactory.init()
		if (!UniversalProviderFactory.provider)
			throw new Error('Failed to initialize universal provider')

		return UniversalProviderFactory.provider;
	}

	static async createSignClient(logger: Logger, opts: UniversalProviderOpts): Promise<ISignClient> {
		return SignClient.init({
			logger: logger,
			relayUrl: opts.relayUrl || RELAY_URL,
			projectId: opts.projectId,
			metadata: opts.metadata,
			storageOptions: opts.storageOptions,
			storage: opts.storage,
			name: opts.name,
			signConfig: {
				disableRequestQueue: opts.disableProviderPing,
			},
		});
	}

	static createLogger(opts: ProviderOpts) : Logger {
		if (opts.logger) {
			if (typeof opts.logger === "string") {
				return pino(getDefaultLoggerOptions({level: opts.logger}));
			}
			return opts.logger;
		}
		return pino(getDefaultLoggerOptions({ level: "error"}));
	}

	public static async init() {
		const logger: Logger = UniversalProviderFactory.createLogger(UniversalProviderFactory.providerOpts);
		UniversalProviderFactory.context = {
			logger: logger,
			dryRun: UniversalProviderFactory.providerOpts.dryRun,
		};
		if (!UniversalProviderFactory.providerOpts.client) {
			UniversalProviderFactory.providerOpts.client = await UniversalProviderFactory.createSignClient(logger, UniversalProviderFactory.providerOpts);
		}
		UniversalProviderFactory.provider = await UniversalProvider.init(UniversalProviderFactory.providerOpts);
		UniversalProviderFactory.provider.on('display_uri', UniversalProviderFactory.providerOpts.sessionProposalCallback)
		// Subscribe to session ping
		UniversalProviderFactory.provider.on(
			'session_ping',
			({ id, topic }: { id: number; topic: string }) => {
				UniversalProviderFactory.context.logger.info("session_ping" , id, topic)
			}
		)
		// Subscribe to session event
		UniversalProviderFactory.provider.on(
			'session_event',
			({ event, chainId }: { event: unknown; chainId: string }) => {
				UniversalProviderFactory.context.logger.info("session_event", event, chainId)
			}
		)

		// Subscribe to session update
		UniversalProviderFactory.provider.on(
			'session_update',
			({ topic, params }: { topic: string; params: unknown }) => {
				UniversalProviderFactory.context.logger.info("session_update", topic, params);
			}
		)

		// Subscribe to session delete
		UniversalProviderFactory.provider.on('session_delete', (obj: any) => {
			UniversalProviderFactory.context.logger.info('session_delete', JSON.stringify(obj));
			//delete UniversalProviderFactory.provider?.session.namespaces.solana
			//setAddress('')
		})
	}

	public static sessionFactory(): ISessionFactory | undefined {
		if (!UniversalProviderFactory.session) {
			if (!UniversalProviderFactory.provider) {
				return undefined;
			}
			//TODO check if connected
			if (!UniversalProviderFactory.provider.session) {
				return undefined;
			}
			UniversalProviderFactory.session = SessionFactory.create(UniversalProviderFactory.provider, this.context);
		}

		return UniversalProviderFactory.session;
	}

	public static async close()  {
		let client = UniversalProviderFactory.providerOpts.client;
		if (!client) {
			return
		}

		if (client.core.relayer.connected) {
			await client.core.relayer.transportClose();
		}
		await client.core.relayer.provider.disconnect();
		client.core.events.removeAllListeners();
		client.core.relayer.events.removeAllListeners();
		client.core.heartbeat.stop();
		client.core.relayer.provider.events.removeAllListeners();
		client.core.relayer.subscriber.events.removeAllListeners();
		client.core.relayer.provider.connection.events.removeAllListeners();
		//delete client;
		//delete UniversalProviderFactory.provider
	}
}

