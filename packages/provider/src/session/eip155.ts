import {type Address, createPublicClient, createWalletClient, custom, http, type PublicClient, type WalletClient} from 'viem';
import { type Chain } from '@uni-wc/chains';
import UniversalProvider from "@walletconnect/universal-provider";
import {type IContext} from "../factory";
import { Logger } from '@walletconnect/logger';

export interface IEipSession {
	pc: PublicClient,
	wc: WalletClient,
	chain: Chain,
	account: Address,
}

interface Eip155Provider {
	requestAccounts(): string[]
}

export class EipSession implements IEipSession {
	readonly pc: PublicClient;
	readonly wc: WalletClient;
	readonly chain: Chain;
	readonly account: Address;
	readonly logger: Logger;

	constructor(c: Chain, provider: UniversalProvider, context: IContext) {
		const walletConnectProvider: Eip155Provider | undefined = provider.rpcProviders['eip155'] as Eip155Provider;
		this.logger = context.logger.child({context: `eip-${c.id}`});
		if (walletConnectProvider.requestAccounts().length == 0) {
			throw new Error("balagan");
		}
		this.account = walletConnectProvider.requestAccounts()[0] as Address;
		this.chain = c;
		this.pc = createPublicClient({
			chain: c.vchain,
			transport: http(undefined, {
				onFetchRequest: (req) => {
					console.log(JSON.stringify(req.body));
					this.logger.debug({chain: c.id, req: JSON.stringify(req.body)})
				},
				onFetchResponse: (res)  => {
					console.log(JSON.stringify(res.body));
					this.logger.debug({chain: c.id, req: JSON.stringify(res.body)})
				}
			}),
			key: this.account as Address,
		}) as PublicClient;
		const l = this.logger;
		this.wc = createWalletClient({
			chain: c.vchain,
			//account: this.account,
			transport: custom({
				async request({ method, params }) {
					console.log(JSON.stringify(params));
					l.debug(`sending request ${method}  ${JSON.stringify(params)}`);
					await provider.request({
						method,
						params
					}, c.id, undefined)
				}
			})
		})
		//this.wc.transport.request = this.wc.transport.request.bind(this);
	}
}

/*
	public static getEip155Provider(chainId: string): Eip155Provider | undefined {
		const chain = chainById(chainId);
		if (!chain) {
			return undefined;
		}
		if (!UniversalProviderFactory.provider) {
			return undefined;
		}
		if (!UniversalProviderFactory.provider.session) {
			return undefined;
		}
		if (! UniversalProviderFactory.provider.session.namespaces.hasOwnProperty("eip155")) {
			return undefined
		}
		if (chainId in UniversalProviderFactory.eipProviders) {
			return UniversalProviderFactory.eipProviders[chainId];
		}
		const ns = UniversalProviderFactory.provider!.session!.namespaces;
		if (!ns.eip155.chains) {
			return undefined
		}
		const found = ns['eip155'].chains.find((c) => c == chainId);
		if (found) {
			UniversalProviderFactory.eipProviders[chainId] = new Eip155Provider(chain, UniversalProviderFactory.provider)
			return UniversalProviderFactory.eipProviders[chainId];
		}
		return undefined;
	}
 */
