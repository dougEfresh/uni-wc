import {createPublicClient, http} from 'viem';
import { Chain } from '@uni-wc/chains';

export class Eip155Provider {
	readonly pc: any;
	constructor(c: Chain) {
		this.pc = createPublicClient({
			chain: c.vchain,
			transport: http(),
		})
	}
}
