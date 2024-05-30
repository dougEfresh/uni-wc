import { meterTestnet as vmeterTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const meterTestnet: Chain = {
	id: "eip155:" + vmeterTestnet.id,
	namespace: "eip155",
	vchain: vmeterTestnet,
};
