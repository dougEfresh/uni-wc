import { flowMainnet as vflowMainnet } from "viem/chains";
import {Chain} from "../chain";


export const flowMainnet: Chain = {
	id: "eip155:" + vflowMainnet.id,
	namespace: "eip155",
	vchain: vflowMainnet,
};
