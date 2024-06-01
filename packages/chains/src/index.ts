import {ALL_CHAINS} from "./chains/chains.js";

export * from './chains/index.js';
export {type Chain } from './chains/chain.js';
export {NAMESPACE_MAIN, NAMESPACE_TEST} from './chains/namespace.js';
export {ALL_CHAINS, TEST_CHAINS, MAIN_CHAINS} from './chains/chains.js';

import { Chain as chainy } from './chains/chain.js';

export function chainById(chainId: String): chainy  | undefined {
	return ALL_CHAINS.find((c) => c.id == chainId);
}

