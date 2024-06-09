import { bscTestnet as vbscTestnet } from "viem/chains";
import {Chain} from "../chain";


export const bscTestnet: Chain = {
	id: "eip155:" + vbscTestnet.id,
	namespace: "eip155",
	vchain: vbscTestnet,
};
