import { flowMainnet as vflowMainnet } from "viem/chains";
import {type Chain} from "../chain";


export const flowMainnet: Chain = {
	id: "eip155:" + vflowMainnet.id,
	namespace: "eip155",
	vchain: vflowMainnet,
};
