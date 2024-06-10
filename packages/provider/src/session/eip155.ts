import {Address, createPublicClient, createWalletClient, custom, http, PublicClient, WalletClient} from 'viem';
import { Chain } from '@uni-wc/chains';
import UniversalProvider from "@walletconnect/universal-provider";
import {IContext} from "../factory";

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

	constructor(c: Chain, provider: UniversalProvider, context: IContext) {
		const walletConnectProvider: Eip155Provider | undefined = provider.rpcProviders['eip155'] as Eip155Provider;

		if (walletConnectProvider.requestAccounts().length == 0) {
			throw new Error("balagan");
		}
		this.account = walletConnectProvider.requestAccounts()[0] as Address;
		this.chain = c;
		this.pc = createPublicClient({
			chain: c.vchain,
			transport: http(),
			key: this.account as Address,
		}) as PublicClient;
		this.wc = createWalletClient({
			chain: c.vchain,
			transport: custom({
				async request({ method, params }) {
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
