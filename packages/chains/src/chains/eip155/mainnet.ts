import { mainnet as vmainnet } from "viem/chains";
import {Chain} from "../chain";


export const mainnet: Chain = {
	id: "eip155:" + vmainnet.id,
	namespace: "eip155",
	vchain: vmainnet,
};
