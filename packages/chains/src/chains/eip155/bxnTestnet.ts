import { bxnTestnet as vbxnTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const bxnTestnet: Chain = {
	id: "eip155:" + vbxnTestnet.id,
	namespace: "eip155",
	vchain: vbxnTestnet,
};
