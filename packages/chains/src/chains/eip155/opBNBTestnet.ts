import { opBNBTestnet as vopBNBTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const opBNBTestnet: Chain = {
	id: "eip155:" + vopBNBTestnet.id,
	namespace: "eip155",
	vchain: vopBNBTestnet,
};
