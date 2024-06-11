import { bscTestnet as vbscTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const bscTestnet: Chain = {
	id: "eip155:" + vbscTestnet.id,
	namespace: "eip155",
	vchain: vbscTestnet,
};
