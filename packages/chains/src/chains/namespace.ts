import { solana, solanadev } from './solana'
import {DEVX_CHAINS, MAIN_CHAINS, SANDBOX_CHAINS} from "./chains";
import {cosmos} from "./cosmos";


interface BaseRequiredNamespace {
	chains: string[];
	methods: string[];
	events: string[];
}

interface NamespaceConfig {
	[namespace: string]: BaseRequiredNamespace;
}

export const NAMESPACE_DEVX: NamespaceConfig = {
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

export const NAMESPACE_TEST: NamespaceConfig = {
	"cosmos": {
		chains:[cosmos.id],
		methods: ["cosmos_signDirect"],
		events:[],
	},
	"solana": {
		chains: [solanadev.id],
		methods: ["solana_signMessage", "solana_signTransaction"],
		events: [],
	},
	"eip155": {
		chains: SANDBOX_CHAINS.filter((c) => c.namespace === "eip155").map((c) => c.id),
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
		methods: ["solana_signMessage", "solana_signTransaction"],
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

