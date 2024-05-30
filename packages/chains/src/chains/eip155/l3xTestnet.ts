import { l3xTestnet as vl3xTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const l3xTestnet: Chain = {
	id: "eip155:" + vl3xTestnet.id,
	namespace: "eip155",
	vchain: vl3xTestnet,
};
