import { pulsechain as vpulsechain } from "viem/chains";
import {Chain} from "../chain.js";


export const pulsechain: Chain = {
	id: "eip155:" + vpulsechain.id,
	namespace: "eip155",
	vchain: vpulsechain,
};
