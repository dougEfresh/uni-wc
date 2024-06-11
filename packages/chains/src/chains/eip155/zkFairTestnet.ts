import { zkFairTestnet as vzkFairTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const zkFairTestnet: Chain = {
	id: "eip155:" + vzkFairTestnet.id,
	namespace: "eip155",
	vchain: vzkFairTestnet,
};
