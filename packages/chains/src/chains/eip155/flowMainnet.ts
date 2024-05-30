import { flowMainnet as vflowMainnet } from "viem/chains";
import {Chain} from "../chain.js";


export const flowMainnet: Chain = {
	id: "eip155:" + vflowMainnet.id,
	namespace: "eip155",
	vchain: vflowMainnet,
};
