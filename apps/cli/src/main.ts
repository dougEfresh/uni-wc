import {UniversalProviderFactory} from "@uni-wc/provider";
import {NAMESPACE_MAIN, NAMESPACE_TEST, NAMESPACE_DEVX} from "@uni-wc/chains";
import UniversalProvider, {type ConnectParams} from "@walletconnect/universal-provider";
import {type SessionTypes} from "@walletconnect/types";
import {xdgData} from 'xdg-basedir';
import qr from 'qrcode-terminal';
import {program} from 'commander';
import {Fireblocks, type Web3ConnectionsApiCreateRequest} from "@fireblocks/ts-sdk";
import {displayMenu, withTimeout} from "./menu";
import pino from 'pino';
import clipboardy from 'clipboardy';


const dbPath = `${xdgData}/uni-wc`;

async function handle_session_proposal(uri: string, fireblocksVaultId: number) {
	clipboardy.writeSync(uri);
		qr.generate(uri, {small: true}, (qrcode: any) => {
			console.info('Scan the QR code below with your wallet:');
			console.log(qrcode);
		});
		console.log(uri);
		if (fireblocksVaultId >= 0) {
			try {
				const fb = new Fireblocks();
				const web3 = await fb.web3Connections.create(<Web3ConnectionsApiCreateRequest>{
					createConnectionRequest: {
						vaultAccountId: fireblocksVaultId,
						feeLevel: "MEDIUM",
						uri: uri,
					}
				});
				await fb.web3Connections.submit({
					id: web3.data.id,
					respondToConnectionRequest: {approve: true}
				});
			} catch (e) {
				console.error(e);
			}
		}
}

export async function main()
{
	const options = program.opts();
	const fireblocksVaultId: number = options.fireblocks;
	const useTestnet: boolean = options.testnet || false;
	const useDevnet: boolean = options.devnet || false;
	const lvl: string = options.logLevel;
	const dryRun: boolean = options.dryRun;


	const logger = pino({
		level: lvl,
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

	let dbLocation = dbPath;
	if (useTestnet) {
		dbLocation = `${dbPath}/testnet`
	}
	if (useDevnet) {
		dbLocation = `${dbPath}/devNet`
	}
	console.log(dbLocation);
	logger.info(`using ${dbLocation}`)
	const opts  = {
		dryRun: dryRun,
		client: undefined,
		disableProviderPing: true,
		logger: logger,
		//logger: "debug",
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
			database: dbLocation
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

	let  namespaces: ConnectParams = NAMESPACE_MAIN;
	if (useDevnet) {
		namespaces = NAMESPACE_DEVX;
	}
	if (useTestnet) {
		namespaces = NAMESPACE_TEST;
	}

	for (const ns in namespaces.namespaces ) {
		logger.info(`namespace=${ns} chains=${namespaces.namespaces[ns].chains.join(",")}` );
	}
	try {
		await provider.connect(namespaces);
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
	} catch (e) {
		logger.error(e);
		return
	}
	console.clear();
	await displayMenu();
}

