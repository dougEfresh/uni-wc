import { Chain } from '@uni-wc/chains';
import {EipSession} from "./eip155";
import UniversalProvider from "@walletconnect/universal-provider";
import {chainById, solana, solanadev} from "@uni-wc/chains";
import {ISolanaSession, SolanaSession} from "./solana";
import {IContext} from "../factory";

export interface ISessionFactory {
	topic: string,
	chains: Chain[];
	eip(chainId: string): EipSession | undefined;
	solana(): ISolanaSession | undefined;
	ping(): Promise<void>;
}

interface EipMap {
	[id: string]: EipSession
}

export class SessionFactory implements ISessionFactory {
	chains: Chain[];
	readonly eipMap: EipMap;
	readonly topic: string;
	private readonly solanaSession: ISolanaSession | undefined = undefined;
	private provider: UniversalProvider;
	private readonly context: IContext;

	constructor(chains: Chain[], provider: UniversalProvider, context: IContext) {
		if (!provider.session) {
			throw new Error("no session available");
		}
		this.provider = provider;
		this.chains = chains;
		this.eipMap = {}
		for (const chain of chains) {
			if (chain.id.startsWith("eip155:")) {
				this.eipMap[chain.id] = new EipSession(chain, provider, context)
			}
		}
		const c = this.chains.find((c) => c.id == solana.id || c.id == solanadev.id);
		if (c) {
			//TODO check !!
			this.solanaSession = new SolanaSession(c, provider.rpcProviders['solana'], provider.session.topic, context);
		}
		this.topic = provider.session.topic;
		this.context = context;
	}

	solana(): ISolanaSession | undefined {
		return this.solanaSession;
	}

	eip(chainId: string): EipSession | undefined {
		return this.eipMap[chainId];
	}

	async ping(): Promise<void> {
		return this.provider.client.ping({
			topic: this.topic
		});
	}

	public static create(provider: UniversalProvider, context: IContext) {
		const c: Chain[] = [];
		for (const [key, value] of Object.entries(provider.session!.namespaces)) {
			if (!value.chains)
				continue
			for(const id of value.chains) {
				const chain = chainById(id);
				if (!chain) {
					throw new Error(`failed to find chain for id  ${id}`);
				}
				c.push(chain);
			}
		}
		return new SessionFactory(c, provider, context);
	}
}

