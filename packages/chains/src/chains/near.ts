import {defineChain} from "viem";
import {type Chain} from "./chain";

const vnear = defineChain({
	id: -1,
	name: 'Near',
	network: 'near',
	nativeCurrency: {
		name: 'near',
		symbol: 'NEAR',
		decimals: 9,
	},
	rpcUrls: {
		public: {
			http:  [
				"https://rpc.mainnet.near.org",
				"https://near.nownodes.io/"
			],
			//webSocket: [],
		},
		default: {
			http: ["https://rpc.mainnet.near.org"],
			//webSocket: ['wss://eth-rpc-acala.aca-api.network'],
		},
	},
	blockExplorers: {
		default: {
			name: 'near',
			url: 'https://solscan.io',
			//apiUrl: 'https://blockscout.acala.network/api',
		},
	},
	testnet: false,
});

const vneartest = defineChain({
	id: -1,
	name: 'Near',
	network: 'near',
	nativeCurrency: {
		name: 'Near',
		symbol: 'NEAR',
		decimals: 9,
	},
	rpcUrls: {
		public: {
			http:  [
				"https://rpc.mainnet.near.org",
				"https://near.nownodes.io/"
			],
			//webSocket: [],
		},
		default: {
			http: ["https://rpc.mainnet.near.org"],
			//webSocket: ['wss://eth-rpc-acala.aca-api.network'],
		},
	},
	blockExplorers: {
		default: {
			name: 'near',
			url: 'https://solscan.io',
			//apiUrl: 'https://blockscout.acala.network/api',
		},
	},
	testnet: true,
});
export const near: Chain = {
	id: "near:mainnet",
	namespace: "near",
	vchain: vnear
}

export const neartestnet: Chain = {
	id: "near:testnet",
	namespace: "near",
	vchain: vneartest
}
