import { kavaTestnet as vkavaTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const kavaTestnet: Chain = {
	id: "eip155:" + vkavaTestnet.id,
	namespace: "eip155",
	vchain: vkavaTestnet,
};
