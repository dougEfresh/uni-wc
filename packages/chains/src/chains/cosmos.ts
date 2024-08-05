import {defineChain} from "viem";
import {type Chain} from "./chain";

const vcosmos = defineChain({
	id: -1,
	name: 'Cosmos',
	network: 'cosmos',
	nativeCurrency: {
		name: 'Cosmos',
		symbol: 'ATOM',
		decimals: 9,
	},
	rpcUrls: {
		public: {
			http:  [
				"https://rpc.cosmos.network",
			],
			//webSocket: [],
		},
		default: {
			http: ["https://api.mainnet-beta.solana.com"]
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

export const cosmos: Chain = {
	id: "cosmos:cosmoshub-4",
	namespace: "cosmos",
	vchain: vcosmos
}
