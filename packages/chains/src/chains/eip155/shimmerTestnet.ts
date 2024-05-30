import { shimmerTestnet as vshimmerTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const shimmerTestnet: Chain = {
	id: "eip155:" + vshimmerTestnet.id,
	namespace: "eip155",
	vchain: vshimmerTestnet,
};
