import { solana, solanadev } from './solana'
import {DEVX_CHAINS} from "./chains";
import {cosmos} from "./cosmos";
import {sepolia} from "./eip155/sepolia";
import {baseSepolia} from "./eip155/baseSepolia";
import {eth} from "./eip155/eth";
import {polygonAmoy} from "./eip155/polygonAmoy";
import {arbitrumSepolia} from "./eip155/arbitrumSepolia";
import {optimismSepolia} from "./eip155/optimismSepolia";
import {arbitrum} from "./eip155/arbitrum";
import {avalanche} from "./eip155/avalanche";
import {base} from "./eip155/base";
import {celo} from "./eip155/celo";
import {optimism} from "./eip155/optimism";

import {type ConnectParams} from "@walletconnect/universal-provider";
import {avalancheFuji} from "./eip155/avalancheFuji";
import {neartestnet} from "./near";

/*
export interface ConnectParams {
	pairingTopic?: string
	skipPairing: boolean,
	namespaces: ProposalTypes.RequiredNamespaces,
	optionalNamespaces?: ProposalTypes.OptionalNamespaces
}
 */


export const NAMESPACE_DEVX: ConnectParams = {
	pairingTopic: undefined,
	skipPairing: true,
	namespaces: {
		"solana": {
			chains: [solanadev.id],
			methods: ["solana_signMessage", "solana_signTransaction"],
			events: [],
		},
		"eip155": {
			chains: DEVX_CHAINS.filter((c) => c.namespace === "eip155").map((c) => c.id),
			methods: [
				'eth_sendTransaction',
				'eth_signTransaction',
				'eth_sign',
				'personal_sign',
				'eth_signTypedData'
			],
			events: []
		}
	}
}

export const NAMESPACE_TEST: ConnectParams= {
	pairingTopic: undefined,
	skipPairing: true,
	namespaces : {
		"eip155": {
			chains: [sepolia.id],
			methods: [
				'eth_sendTransaction',
				'eth_signTransaction',
				'eth_sign',
				'personal_sign',
				'eth_signTypedData'
			],
			events: []
		}
	},
	optionalNamespaces: {
		"near" : {
			chains: [neartestnet.id],
			methods: ["near_signTransaction"],
			events: []
		},
		/*
		"cosmos": {
			chains:[cosmos.id],
			methods: ["cosmos_signDirect"],
			events:[],
		},
		 */
		"solana": {
			chains: [solanadev.id],
			methods: ["solana_signMessage", "solana_signTransaction"],
			events: [],
		},
		"eip155": {
			chains: [baseSepolia.id, polygonAmoy.id, arbitrumSepolia.id, optimismSepolia.id, avalancheFuji.id],
			methods: [
				'eth_sendTransaction',
				'eth_signTransaction',
				'eth_sign',
				'personal_sign',
				'eth_signTypedData'
			],
			events: []
		}
	}
}

export const NAMESPACE_MAIN: ConnectParams = {
	pairingTopic: undefined,
	skipPairing: true,
	namespaces: {
		"eip155": {
			chains: [eth.id],
			methods: [
				'eth_sendTransaction',
				'eth_signTransaction',
				'eth_sign',
				'personal_sign',
				'eth_signTypedData'
			],
			events: []
		}
	},
	optionalNamespaces: {
		"cosmos": {
			chains: [cosmos.id],
			methods:["cosmos_signDirect"],
			events: []
		},
		"solana": {
			chains: [solana.id],
			methods: ["solana_signMessage", "solana_signTransaction"],
			events: [],
		},
		"eip155": {
			chains: [arbitrum.id, avalanche.id, base.id, celo.id, optimism.id],
			methods: [
				'eth_sendTransaction',
				'eth_signTransaction',
				'eth_sign',
				'personal_sign',
				'eth_signTypedData'
			],
			events: []
		}
	}
};

