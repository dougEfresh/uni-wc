import { qMainnet as vqMainnet } from "viem/chains";
import {type Chain} from "../chain";


export const qMainnet: Chain = {
	id: "eip155:" + vqMainnet.id,
	namespace: "eip155",
	vchain: vqMainnet,
};
