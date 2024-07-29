import pino from "pino";
import {Fireblocks, type Web3ConnectionsApiCreateRequest} from "@fireblocks/ts-sdk";
import {baseSepolia, CHAINS, NAMESPACE_TEST, polygonAmoy, sepolia, optimismSepolia} from "@uni-wc/chains";
import {UniversalProviderFactory, type ISolanaSession, type IEipSession, type IContext} from "@uni-wc/provider";
import UniversalProvider from "@walletconnect/universal-provider";
import dotenv from "dotenv";


export function config_from_env() {

	dotenv.config({
		path: "../../.env"
	});

	for (const envKey in process.env) {
		const chainId = envKey.replace("_", ":");
		const chain = CHAINS.get(chainId);
		if (chain) {
			console.log("using custom RPC ", process.env[envKey]);
			chain.vchain.rpcUrls["custom"] = {
				http: process.env[envKey]!.split(","),
			};
		}
	}


}

export interface TestSessions {
	provider: UniversalProvider;
	solSession: ISolanaSession;
	sepoliaSession: IEipSession;
	baseSepoliaSession: IEipSession;
	polygonSepoliaSession: IEipSession;
	opSepoliaSession: IEipSession;
	ctx: IContext;
}

export async function test_init(): Promise<TestSessions> {
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
		logger: logger,
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
	const _baseSepolia = sessions!.eip(baseSepolia.id);
	if (!_baseSepolia) {
		throw new Error("no sepolia session found");
	}
	const _polygonSepolia = sessions!.eip(polygonAmoy.id);
	if (!_polygonSepolia) {
		throw new Error("no polygon session found");
	}
	const _opSepolia = sessions!.eip(optimismSepolia.id);
	if (!_opSepolia) {
		throw new Error("no opSepolia session found");
	}
	const sepoliaSession = _sepolia!;
	const baseSepoliaSession = _baseSepolia;
	const opSepoliaSession = _opSepolia;
	const s = sessions.solana();
	if (!s) {
		throw new Error("no solana session found");
	}
	const solSession = s!;
	return {
		provider,
		solSession,
		sepoliaSession,
		baseSepoliaSession,
		opSepoliaSession,
		polygonSepoliaSession: _polygonSepolia,
		ctx: {
			dryRun: false,
			logger: logger
		}
	}
}
