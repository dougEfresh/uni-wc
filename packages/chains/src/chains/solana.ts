import {defineChain} from "viem";
import {type Chain} from "./chain";

const vsolmain = defineChain({
	id: -1,
	name: 'Solana',
	network: 'solana',
	nativeCurrency: {
		name: 'Solana',
		symbol: 'SOL',
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

const vsoldev = defineChain({
	id: -1,
	name: 'Solana',
	network: 'solana',
	nativeCurrency: {
		name: 'Solana',
		symbol: 'SOL',
		decimals: 9,
	},
	rpcUrls: {
		public: {
			http:  [
				"https://api.devnet.solana.com",
			],
			//webSocket: [],
		},
		default: {
			http: ["https://api.devnet.solana.com" ],
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

export const solana: Chain = {
	id: "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ",
	namespace: "solana",
	vchain: vsolmain
}

export const solanadev: Chain = {
	id: "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K",
	namespace: "solana",
	vchain: vsoldev
}


