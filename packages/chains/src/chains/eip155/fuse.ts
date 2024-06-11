import { fuse as vfuse } from "viem/chains";
import {type Chain} from "../chain";


export const fuse: Chain = {
	id: "eip155:" + vfuse.id,
	namespace: "eip155",
	vchain: vfuse,
};
