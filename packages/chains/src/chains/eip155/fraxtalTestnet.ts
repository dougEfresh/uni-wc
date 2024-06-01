import { fraxtalTestnet as vfraxtalTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const fraxtalTestnet: Chain = {
	id: "eip155:" + vfraxtalTestnet.id,
	namespace: "eip155",
	vchain: vfraxtalTestnet,
};