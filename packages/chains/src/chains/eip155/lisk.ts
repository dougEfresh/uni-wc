import { lisk as vlisk } from "viem/chains";
import {type Chain} from "../chain";


export const lisk: Chain = {
	id: "eip155:" + vlisk.id,
	namespace: "eip155",
	vchain: vlisk,
};
