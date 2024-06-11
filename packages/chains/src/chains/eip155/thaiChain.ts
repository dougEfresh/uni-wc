import { thaiChain as vthaiChain } from "viem/chains";
import {type Chain} from "../chain";


export const thaiChain: Chain = {
	id: "eip155:" + vthaiChain.id,
	namespace: "eip155",
	vchain: vthaiChain,
};
