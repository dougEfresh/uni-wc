import { shimmerTestnet as vshimmerTestnet } from "viem/chains";
import {Chain} from "../chain";


export const shimmerTestnet: Chain = {
	id: "eip155:" + vshimmerTestnet.id,
	namespace: "eip155",
	vchain: vshimmerTestnet,
};
