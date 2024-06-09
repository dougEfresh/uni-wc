import { bsc as vbsc } from "viem/chains";
import {Chain} from "../chain";


export const bsc: Chain = {
	id: "eip155:" + vbsc.id,
	namespace: "eip155",
	vchain: vbsc,
};
