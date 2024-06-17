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
		this.logger = context.logger.child({context: `${c.id}`});
		if (walletConnectProvider.requestAccounts().length == 0) {
			throw new Error("balagan");
		}
		this.account = walletConnectProvider.requestAccounts()[0] as Address;
		this.chain = c;
		const publicLogger = this.logger.child( {client: "public-client"});
		const walletLogger = this.logger.child({client: "wallet-client"});
		let url = c.vchain.rpcUrls.default.http[0];
		if ("custom" in c.vchain.rpcUrls) {
			 url = c.vchain.rpcUrls["custom"].http[0];
		}
		this.pc = createPublicClient({
			chain: c.vchain,
			transport: http(url, {
				onFetchRequest: async (req) => {
					const j = await req.json();
					const msg = `${req.url} - ${JSON.stringify(j)}`;
					publicLogger.debug(msg);
				},
				onFetchResponse: async (res)  => {
					publicLogger.debug("got response");
				}
			}),
			key: this.account as Address,
		}) as PublicClient;
		this.wc = createWalletClient({
			chain: c.vchain,
			account: this.account,
			transport: custom({
				async request(req) {
					walletLogger.debug(`sending request ${JSON.stringify(req)}`);
					return provider.request({
						method: req.method,
						params: req.params
					}, c.id, undefined)
				}
			})
		})
	}
}
