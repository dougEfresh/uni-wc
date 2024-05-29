import {Chain as Vchain, defineChain} from 'viem'

export type Chain = {
	id: string,
	namespace: string,
	vchain: Vchain,
}
