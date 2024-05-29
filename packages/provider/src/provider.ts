import { UniversalProvider }   from '@walletconnect/universal-provider';
import { UniversalProviderOpts } from '@walletconnect/universal-provider'

export class UniversalProviderFactory {
	protected static provider: any
	protected static providerOpts: UniversalProviderOpts

	public static configure(providerOpts: UniversalProviderOpts) {
		UniversalProviderFactory.providerOpts = providerOpts;
	}

	public static async getProvider() {
		if (!UniversalProviderFactory.provider) await UniversalProviderFactory.init()
		if (!UniversalProviderFactory.provider)
			throw new Error('Failed to initialize universal provider')

		return UniversalProviderFactory.provider;
	}

	public static async init() {
		UniversalProviderFactory.provider = await UniversalProvider.init(UniversalProviderFactory.providerOpts);

		// Subscribe to session ping
		UniversalProviderFactory.provider.on(
			'session_ping',
			({ id, topic }: { id: number; topic: string }) => {
				console.log(id, topic)
			}
		)
		// Subscribe to session event
		UniversalProviderFactory.provider.on(
			'session_event',
			({ event, chainId }: { event: unknown; chainId: string }) => {
				console.log(event, chainId)
			}
		)

		// Subscribe to session update
		UniversalProviderFactory.provider.on(
			'session_update',
			({ topic, params }: { topic: string; params: unknown }) => {
				console.log(topic, params)
			}
		)

		// Subscribe to session delete
		UniversalProviderFactory.provider.on('session_delete', (obj: any) => {
			console.log('session delete', JSON.stringify(obj));
			//delete UniversalProviderFactory.provider?.session.namespaces.solana
			//setAddress('')
		})
	}
}
