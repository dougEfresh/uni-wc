import test from 'ava';
import {xdgData } from 'xdg-basedir';
import {UniversalProviderFactory} from "../factory.js";
import UniversalProvider from "@walletconnect/universal-provider";
import {SolanaSession} from "./solana.js";
import {solanadev} from "@uni-wc/chains";
import {LAMPORTS_PER_SOL, PublicKey, SystemProgram} from "@solana/web3.js";

const dbPath = `${xdgData}/uni-wc`;

test('solana-sign-message', async t => {

	UniversalProviderFactory.configure({
		client: undefined,
		disableProviderPing: false,
		logger: "error",
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
	const accts = await provider.enable();
	t.assert(accts.length > 0);

	const solana = new SolanaSession(solanadev, provider);
	const intx = SystemProgram.transfer({
		fromPubkey: solana.account,
		lamports: LAMPORTS_PER_SOL,
		toPubkey: new PublicKey(""),
	});
	try {
		const tx = await solana.signTransaction([intx]);
		console.log("hash " + tx.recentBlockhash);
	} catch(e)  {
		console.error(e);
	}
});
