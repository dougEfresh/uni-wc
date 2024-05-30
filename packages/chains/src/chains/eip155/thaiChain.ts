import { thaiChain as vthaiChain } from "viem/chains";
import {Chain} from "../chain.js";


export const thaiChain: Chain = {
	id: "eip155:" + vthaiChain.id,
	namespace: "eip155",
	vchain: vthaiChain,
};
