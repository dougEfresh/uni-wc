import { flowTestnet as vflowTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const flowTestnet: Chain = {
	id: "eip155:" + vflowTestnet.id,
	namespace: "eip155",
	vchain: vflowTestnet,
};
