import { qTestnet as vqTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const qTestnet: Chain = {
	id: "eip155:" + vqTestnet.id,
	namespace: "eip155",
	vchain: vqTestnet,
};
