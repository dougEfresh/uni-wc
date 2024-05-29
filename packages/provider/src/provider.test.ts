import test from 'ava';
import {UniversalProviderFactory} from "./provider.js";
import UniversalProvider from "@walletconnect/universal-provider";
import {SessionTypes} from "@walletconnect/types";
import * as console from "node:console";

const providerOpts = {
	client: undefined,
	disableProviderPing: true,
	logger: "debug",
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
};

test('provider-init', async t => {
	UniversalProviderFactory.configure(providerOpts);
	const provider  = await UniversalProviderFactory.getProvider() as UniversalProvider;
	t.assert(provider !== undefined);
	const connect = new Promise<boolean>((resolve, reject) => {
		provider.on('connect', (session: SessionTypes.Struct) => {
			resolve(true);
		});
		provider.on('error', (error: Error) => {
			reject(error);
		});
	});

	await connect;
	console.log("connect as", connect);
});
