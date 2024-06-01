import type {Chain} from "./chain.js";
import {eth} from "./eip155/eth.js";
import {sepolia} from "./eip155/sepolia.js";
import {solana, solanadev} from "./solana.js";
import {optimismSepolia} from "./eip155/optimismSepolia.js";
import {base} from "./eip155/base.js";
import {baseSepolia} from "./eip155/baseSepolia.js";
import {celoAlfajores} from "./eip155/celoAlfajores.js";
import {optimism} from "./eip155/optimism.js";
import {polygon} from "./eip155/polygon.js";
import {arbitrum} from "./eip155/arbitrum.js";
import {celo} from "./eip155/celo.js";
import {zkSync} from "./eip155/zkSync.js";

export const ALL_CHAINS: Chain[] = [
	eth,
	sepolia,
	solana,
	solanadev,
	optimismSepolia,
	base,
	baseSepolia,
	celoAlfajores,
	optimism,
	polygon,
	arbitrum,
	celo,
	zkSync
]

export const TEST_CHAINS: Chain[] = ALL_CHAINS.filter((c) => c.vchain.testnet);

export const MAIN_CHAINS: Chain[] = ALL_CHAINS.filter((c) => !c.vchain.testnet);

