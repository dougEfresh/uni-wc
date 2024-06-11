import {UniversalProviderFactory} from "@uni-wc/provider";
import {NAMESPACE_MAIN, NAMESPACE_TEST} from "@uni-wc/chains";
import UniversalProvider from "@walletconnect/universal-provider";
import {type SessionTypes} from "@walletconnect/types";
import {xdgData} from 'xdg-basedir';
import qr from 'qrcode-terminal';
import {program} from 'commander';
import {Fireblocks, type Web3ConnectionsApiCreateRequest} from "@fireblocks/ts-sdk";
import {displayMenu, withTimeout} from "./menu";
import pino from 'pino';


const dbPath = `${xdgData}/uni-wc`;

async function handle_session_proposal(uri: string, fireblocksVaultId: number) {
		qr.generate(uri, {small: true}, (qrcode: any) => {
			console.info('Scan the QR code below with your wallet:');
			console.log(qrcode);
		});
		console.log('display_uri', uri);
		if (fireblocksVaultId >= 0) {
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
		}
}

export async function main()
{
	const options = program.opts();
	const fireblocksVaultId: number = options.fireblocks;
	const useTestnet: boolean = options.testnet || false;
	const lvl: string = options.logLevel;
	const dryRun: boolean = options.dryRun;

/*
	const logger = pino({
		level: lvl,
		timestamp: pino.stdTimeFunctions.isoTime,
	}, transport);

	*/

	const logger = pino({
		transport: {
			level: lvl,
			target: 'pino-pretty',
			options: {
				destination:  `${dbPath}/console.log`,
				colorize: false,
				levelFirst: false,
				translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
				ignore: 'pid,hostname',
				mkdir: true,
				append: true,
				sync: false,
				//messageFormat: "{timestamp} [{level}] {msg}"
			},
		}
	});

	logger.info("Created logger");
	const opts  = {
		dryRun: dryRun,
		client: undefined,
		disableProviderPing: false,
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
		sessionProposalCallback: async (uri: string) => {await handle_session_proposal(uri, fireblocksVaultId)}
	};

	UniversalProviderFactory.configure(opts);
	const provider: UniversalProvider = await UniversalProviderFactory.getProvider();

	process.on('SIGINT', async () => {
		logger.info('Control-C pressed');
		//await provider.disconnect();
		process.exit();
	});

	provider.on('connect', (session: SessionTypes.Struct) => {
		logger.info('connect', session.topic);
	})
	provider.on('subscription_created', (obj: any) => {
		logger.info("subscription_created", JSON.stringify(obj));
	});

	/*
	provider.on('display_uri', async (uri: string)  => {
		qr.generate(uri, { small: true }, (qrcode: any) => {
			console.info('Scan the QR code below with your wallet:');
			console.log(qrcode);
		});
		console.log('display_uri', uri);
		if (fireblocksVaultId >= 0) {
			logger.info("Calling fireblocks");
			const fb = new Fireblocks();
			const web3 = await fb.web3Connections.create(<Web3ConnectionsApiCreateRequest>{
				createConnectionRequest: {
					vaultAccountId: 0,
					feeLevel: "MEDIUM",
					uri: uri,
				}
			});
			logger.info("approving WalletConnect session");
			await fb.web3Connections.submit({
				id: web3.data.id,
				respondToConnectionRequest:  { approve: true }
			});
		}
	});
	 */

	await provider.connect({
		namespaces: useTestnet ? NAMESPACE_TEST : NAMESPACE_MAIN,
		pairingTopic: undefined,
		skipPairing: true
	})
	if (!provider.session) {
		logger.info("new pairing");
		await provider.pair(undefined);
	}
	await provider.enable();
	logger.info(provider.session);
	try {
		await withTimeout(provider.client.ping({
			topic: provider.session!.topic
		}), 5000);
	} catch (e) {
		logger.error(e);
		//await provider.pair(undefined);
	}
	console.clear();
	await displayMenu();
}

