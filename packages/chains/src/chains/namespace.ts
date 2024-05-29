import { solana, solanadev } from './solana.js'
import {MAIN_CHAINS, TEST_CHAINS} from "./chains.js";


interface BaseRequiredNamespace {
	chains: string[];
	methods: string[];
	events: string[];
}

interface NamespaceConfig {
	[namespace: string]: BaseRequiredNamespace;
}


export const NAMESPACE_TEST: NamespaceConfig = {
	"solana": {
	chains: [solanadev.id],
		methods: ["solana_signMessage"],
		events: [],
},
	"eip155": {
		chains: TEST_CHAINS.filter((c) => c.namespace === "eip155").map((c) => c.id),
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

export const NAMESPACE_MAIN: NamespaceConfig =  {
	"solana": {
		chains: [solana.id],
		methods: ["solana_signMessage"],
		events: [],
	},
		"eip155": {
			chains: MAIN_CHAINS.filter((c) => c.namespace === "eip155").map((c) => c.id),
			methods: [
				'eth_sendTransaction',
				'eth_signTransaction',
				'eth_sign',
				'personal_sign',
				'eth_signTypedData'
			],
			events: []
		}
};

