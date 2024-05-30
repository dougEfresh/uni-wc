import { lisk as vlisk } from "viem/chains";
import {Chain} from "../chain.js";


export const lisk: Chain = {
	id: "eip155:" + vlisk.id,
	namespace: "eip155",
	vchain: vlisk,
};
