import { apexTestnet as vapexTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const apexTestnet: Chain = {
	id: "eip155:" + vapexTestnet.id,
	namespace: "eip155",
	vchain: vapexTestnet,
};
