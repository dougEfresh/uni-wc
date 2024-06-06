import {UniversalProviderFactory} from "@uni-wc/provider";
import {NAMESPACE_MAIN, NAMESPACE_TEST} from "@uni-wc/chains";
import UniversalProvider from "@walletconnect/universal-provider";
import {SessionTypes} from "@walletconnect/types";
import {xdgData } from 'xdg-basedir';
import qr from 'qrcode-terminal';
import {program} from 'commander';
import {Fireblocks, Web3ConnectionsApiCreateRequest} from "@fireblocks/ts-sdk";
import {displayMenu} from "./menu.js";

const dbPath = `${xdgData}/uni-wc`;

export async function main() {
	const options = program.opts();
	const fireblocksVaultId: number = options.fireblocks;
	const useTestnet: boolean = options.testnet || false;
	const lvl: string = options.logLevel;

	UniversalProviderFactory.configure({
		client: undefined,
		disableProviderPing: false,
		logger: lvl,
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
	});

	const provider: UniversalProvider = await UniversalProviderFactory.getProvider();

	process.on('SIGINT', async () => {
		console.log('Control-C pressed');
		//await provider.disconnect();
		process.exit();
	});

	provider.on('connect', (session: SessionTypes.Struct) => {
		console.log('connect', session.topic);
	})
	provider.on('subscription_created', (obj: any) => {
		console.log("subscription_created", JSON.stringify(obj));
	});

	provider.on('display_uri', async (uri: string)  => {
		qr.generate(uri, { small: true }, (qrcode: any) => {
			console.log('Scan the QR code below with your wallet:');
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
				respondToConnectionRequest:  { approve: true }
			});
		}
	});

	await provider.connect({
		namespaces: useTestnet ? NAMESPACE_TEST : NAMESPACE_MAIN,
		pairingTopic: undefined,
		skipPairing: true
	})
	if (!provider.session) {
		console.log("new pairing");
		await provider.pair(undefined);
	}
	await provider.enable();
	console.log(JSON.stringify(provider.session));
	try {
		await withTimeout(provider.client.ping({
			topic: provider.session!.topic
		}), 5000);
	} catch (e) {
		console.error(e);
		await provider.pair(undefined);
	}
	console.clear();
	await displayMenu();
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
	const timeout = new Promise<T>((_, reject) =>
		setTimeout(() => reject(new Error('Operation timed out')), ms)
	);
	return Promise.race([promise, timeout]);
}
