import { shimmer as vshimmer } from "viem/chains";
import {Chain} from "../chain.js";


export const shimmer: Chain = {
	id: "eip155:" + vshimmer.id,
	namespace: "eip155",
	vchain: vshimmer,
};
