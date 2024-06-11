import { modeTestnet as vmodeTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const modeTestnet: Chain = {
	id: "eip155:" + vmodeTestnet.id,
	namespace: "eip155",
	vchain: vmodeTestnet,
};
