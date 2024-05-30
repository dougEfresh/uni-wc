import { flowTestnet as vflowTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const flowTestnet: Chain = {
	id: "eip155:" + vflowTestnet.id,
	namespace: "eip155",
	vchain: vflowTestnet,
};
