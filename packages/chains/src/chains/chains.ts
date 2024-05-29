import type {Chain} from "./chain.js";
import {eth} from "./eth.js";
import {sepolia} from "./sepolia.js";
import {solana, solanadev} from "./solana.js";

export const ALL_CHAINS: Chain[] = [
	eth,
	sepolia,
	solana,
	solanadev,
]

export const TEST_CHAINS: Chain[] = ALL_CHAINS.filter((c) => c.vchain.testnet);

export const MAIN_CHAINS: Chain[] = ALL_CHAINS.filter((c) => !c.vchain.testnet);

