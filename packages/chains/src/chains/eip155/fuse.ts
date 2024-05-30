import { fuse as vfuse } from "viem/chains";
import {Chain} from "../chain.js";


export const fuse: Chain = {
	id: "eip155:" + vfuse.id,
	namespace: "eip155",
	vchain: vfuse,
};
