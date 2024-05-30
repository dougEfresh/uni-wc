import { gobi as vgobi } from "viem/chains";
import {Chain} from "../chain.js";


export const gobi: Chain = {
	id: "eip155:" + vgobi.id,
	namespace: "eip155",
	vchain: vgobi,
};
