import { bsc as vbsc } from "viem/chains";
import {type Chain} from "../chain";


export const bsc: Chain = {
	id: "eip155:" + vbsc.id,
	namespace: "eip155",
	vchain: vbsc,
};
