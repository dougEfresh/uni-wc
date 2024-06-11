import { fraxtalTestnet as vfraxtalTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const fraxtalTestnet: Chain = {
	id: "eip155:" + vfraxtalTestnet.id,
	namespace: "eip155",
	vchain: vfraxtalTestnet,
};
