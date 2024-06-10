import {defineChain} from "viem";

const cosmos = defineChain({
	id: -1,
	name: 'Cosmose',
	network: 'cosmos',
	nativeCurrency: {
		name: 'Cosmos',
		symbol: 'ATOM',
		decimals: 9,
	},
	rpcUrls: {
		public: {
			http:  [
				"https://api.mainnet-beta.solana.com",
				"https://solana-api.projectserum.com",
			],
			//webSocket: [],
		},
		default: {
			http: ["https://api.mainnet-beta.solana.com"],
			//webSocket: ['wss://eth-rpc-acala.aca-api.network'],
		},
	},
	blockExplorers: {
		default: {
			name: 'SolScan',
			url: 'https://solscan.io',
			//apiUrl: 'https://blockscout.acala.network/api',
		},
	},
	testnet: false,
});
