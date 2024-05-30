import { bxnTestnet as vbxnTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const bxnTestnet: Chain = {
	id: "eip155:" + vbxnTestnet.id,
	namespace: "eip155",
	vchain: vbxnTestnet,
};
