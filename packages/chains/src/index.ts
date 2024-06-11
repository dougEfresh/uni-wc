

export * from './chains/index';
export {type Chain } from './chains/chain';
export {NAMESPACE_MAIN, NAMESPACE_TEST} from './chains/namespace';
export {CHAINS, ALL_CHAINS, TEST_CHAINS, MAIN_CHAINS} from './chains/chains';


import {ALL_CHAINS} from "./chains/chains";
import { type Chain as chainy } from './chains/chain';

export function chainById(chainId: String): chainy  | undefined {
	return ALL_CHAINS.find((c) => c.id == chainId);
}
