import { mainnet as vmainnet } from "viem/chains";
import {type Chain} from "../chain";


export const mainnet: Chain = {
	id: "eip155:" + vmainnet.id,
	namespace: "eip155",
	vchain: vmainnet,
};
