import { shimmer as vshimmer } from "viem/chains";
import {type Chain} from "../chain";


export const shimmer: Chain = {
	id: "eip155:" + vshimmer.id,
	namespace: "eip155",
	vchain: vshimmer,
};
