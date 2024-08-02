import type {Chain} from "./chain";
import {eth} from "./eip155/eth";
import {sepolia} from "./eip155/sepolia";
import {solana, solanadev} from "./solana";
import {optimismSepolia} from "./eip155/optimismSepolia";
import {base} from "./eip155/base";
import {baseSepolia} from "./eip155/baseSepolia";
import {celoAlfajores} from "./eip155/celoAlfajores";
import {optimism} from "./eip155/optimism";
import {polygon} from "./eip155/polygon";
import {arbitrum} from "./eip155/arbitrum";
import {celo} from "./eip155/celo";
import {zkSync} from "./eip155/zkSync";
import {cosmos} from "./cosmos";
import {polygonAmoy} from "./eip155/polygonAmoy";

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
	//polygonAmoy,
	arbitrum,
	celo,
	zkSync,
	cosmos,
];

export const CHAINS: Map<string, Chain> = new Map(
	ALL_CHAINS.map((item) => [item.id, item])
);


export const DEVX_CHAINS: Chain[] = [
	sepolia,
	solanadev,
];

export const SANDBOX_CHAINS: Chain[] = ALL_CHAINS.filter((c) => c.vchain.testnet);
export const MAIN_CHAINS: Chain[] = ALL_CHAINS.filter((c) => !c.vchain.testnet);

