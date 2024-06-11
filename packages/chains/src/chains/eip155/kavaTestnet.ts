import { kavaTestnet as vkavaTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const kavaTestnet: Chain = {
	id: "eip155:" + vkavaTestnet.id,
	namespace: "eip155",
	vchain: vkavaTestnet,
};
