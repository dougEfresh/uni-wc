import pino from "pino";
import {Fireblocks, Web3ConnectionsApiCreateRequest} from "@fireblocks/ts-sdk";
import {NAMESPACE_TEST, sepolia} from "@uni-wc/chains";
import {UniversalProviderFactory} from "./factory";
import UniversalProvider from "@walletconnect/universal-provider";
import {ISolanaSession} from "./session/solana";
import {IEipSession} from "./session/eip155";


export interface TestSessions {
	provider: UniversalProvider;
	solSession: ISolanaSession;
	sepoliaSession: IEipSession;
}

export async function _test_init(): Promise<TestSessions> {

	const logger = pino({
		level: "debug",
		transport: {
			target: 'pino-pretty',
			options: {
				destination:  './dist/wc.log',
				colorize: false,
				levelFirst: false,
				translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
				ignore: 'pid,hostname',
				mkdir: true,
				append: true,
				sync: true,
			},
		}
	});

	const dbPath = "./dist/wc";

	const opts  = {
		dryRun: false,
		client: undefined,
		disableProviderPing: true,
		logger: undefined,
		log: logger,
		metadata: {
			name: "uni-walletconnect",
			description: "just use walletconnect",
			url: "https://github.com/dougEfresh",
			icons: [],
			verifyUrl: undefined,
			redirect: undefined,
		},
		projectId: "80a11e83ad1dfde39aff286eb6d74554",
		storage: undefined,
		storageOptions: {
			database: dbPath,
		},
		sessionProposalCallback: async (uri: string) => {
			console.log(`Session proposed with URI: ${uri}`);
			const fb = new Fireblocks();
			const web3 = await fb.web3Connections.create(<Web3ConnectionsApiCreateRequest>{
				createConnectionRequest: {
					vaultAccountId: 0,
					feeLevel: "MEDIUM",
					uri: uri,
				}
			});
			await fb.web3Connections.submit({
				id: web3.data.id,
				respondToConnectionRequest: {approve: true}
			});
		},
	};

	UniversalProviderFactory.configure(opts);

	const provider = await UniversalProviderFactory.getProvider();
	await provider.connect({
		namespaces: NAMESPACE_TEST,
		pairingTopic: undefined,
		skipPairing: true
	})
	if (!provider.session) {
		logger.info("new pairing");
		await provider.pair(undefined);
	}
	const sessions = UniversalProviderFactory.sessionFactory();
	if (!sessions) {
		throw new Error("sesssion factory failed");
	}
	const _sepolia = sessions!.eip(sepolia.id);
	if (!_sepolia) {
		throw new Error("no sepolia session found");
	}
	const sepoliaSession = _sepolia!;
	const s = sessions.solana();
	if (!s) {
		throw new Error("no solana session found");
	}
	const solSession = s!;
	return {
		provider,
		solSession,
		sepoliaSession,
	}
}
