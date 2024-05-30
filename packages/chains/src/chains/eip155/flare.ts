import { flare as vflare } from "viem/chains";
import {Chain} from "../chain.js";


export const flare: Chain = {
	id: "eip155:" + vflare.id,
	namespace: "eip155",
	vchain: vflare,
};
