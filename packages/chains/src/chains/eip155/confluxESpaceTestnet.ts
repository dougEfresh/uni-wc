import { confluxESpaceTestnet as vconfluxESpaceTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const confluxESpaceTestnet: Chain = {
	id: "eip155:" + vconfluxESpaceTestnet.id,
	namespace: "eip155",
	vchain: vconfluxESpaceTestnet,
};
