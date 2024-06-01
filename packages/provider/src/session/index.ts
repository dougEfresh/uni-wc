import { Chain } from '@uni-wc/chains';
import {EipSession} from "./eip155.js";
import UniversalProvider from "@walletconnect/universal-provider";
import {chainById, solana, solanadev} from "@uni-wc/chains";
import {ISolanaSession, SolanaSession} from "./solana.js";


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

	constructor(chains: Chain[], provider: UniversalProvider) {
		if (!provider.session) {
			throw new Error("no session available");
		}
		this.provider = provider;
		this.chains = chains;
		this.eipMap = {}
		for (const chain of chains) {
			if (chain.id.startsWith("eip155:")) {
				this.eipMap[chain.id] = new EipSession(chain, provider)
			}
		}
		const c = this.chains.find((c) => c.id == solana.id || c.id == solanadev.id);
		if (c) {
			this.solanaSession = new SolanaSession(c, provider);
		}
		this.topic = provider.session.topic;
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



	public static create(provider: UniversalProvider) {
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
		return new SessionFactory(c, provider);
	}
}

