import { confluxESpaceTestnet as vconfluxESpaceTestnet } from "viem/chains";
import {Chain} from "../chain";


export const confluxESpaceTestnet: Chain = {
	id: "eip155:" + vconfluxESpaceTestnet.id,
	namespace: "eip155",
	vchain: vconfluxESpaceTestnet,
};
