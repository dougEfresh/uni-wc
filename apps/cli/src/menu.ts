import select, { Separator } from '@inquirer/select';
import {UniversalProviderFactory} from "@uni-wc/provider";
import UniversalProvider, {IProvider} from "@walletconnect/universal-provider";
import  bs88  from 'bs58';
import Eip155Provider from "@walletconnect/universal-provider/dist/types/providers/eip155";
import {solana} from "@uni-wc/chains";

async function eth_sign(provider: UniversalProvider) {
	console.log("signing...check your wallet for approval");
	const chainProvider: Eip155Provider | undefined = provider.rpcProviders['eip155'] as Eip155Provider;
	if (chainProvider) {
		const address = chainProvider.requestAccounts()[0];
		console.log(address);
		try {

		let sig = await provider.request({
			method: "personal_sign",
			params: ["0xabcdef", address]
		}, `eip155:${chainProvider.chainId}`);
			console.log(JSON.stringify(sig));
	} catch (e) {
			console.error(e);
		}

	}
}
async function sol_sign(provider: UniversalProvider) {
	let b58 = bs88.encode(Buffer.from("universe"));
	const chainProvider: IProvider | undefined = provider.rpcProviders['solana'] as IProvider;
	const address = chainProvider.requestAccounts()[0];
	try {
		let sig = await provider.request({
			method: "solana_signMessage",
			params: {
				message: b58,
				pubkey: address
			}
		}, solana.id);
		console.log(JSON.stringify(sig));
	} catch(e) {
		console.error(e);
	}

}


export async function displayMenu(): Promise<void> {
	const provider: UniversalProvider = await UniversalProviderFactory.getProvider();
	const answer = await select({
		message: 'Choose your path',
		choices: [
			{
				name: 'accounts',
				value: 'accounts',
				description: 'show your accounts',
			},
			{
				name: 'sign message',
				value: 'signmessage',
				description: 'sign a message',
			},
			new Separator(),
			{
				name: 'ping',
				value: 'ping',
				description: 'ping session',
			},
			{
				name: 'disconnect',
				value: 'disconnect',
				description: 'clear session',
			},
			{
				name: 'pair',
				value: 'pair',
				description: 'repair',
			},
			{
				name: 'exit',
				value: 'exit',
				description: 'end',
			},
		],
	});
	switch (answer) {
		case 'ping':
			let p = provider.client.core.pairing.getPairings()[0];
			await provider.client.ping({topic: p.topic});
			break;
		case 'disconnect':
			console.log('Disconnecting...');
			await provider.disconnect();
			break;
		case 'accounts':
			for (const [ns, p] of Object.entries(provider.rpcProviders)) {
				p.requestAccounts().forEach((a) => {
					console.log(`${ns} ${a}`);
				})
			}
			break;
		case 'pair':
			await provider.pair(undefined);
			break;
		case 'signmessage':
			await eth_sign(provider);
			await sol_sign(provider);
			break;
		case 'exit':
			process.exit();
			break;
		default:
			console.log('Invalid choice', answer);
			break;
	}
	// Go back to the main menu
	displayMenu();
}
