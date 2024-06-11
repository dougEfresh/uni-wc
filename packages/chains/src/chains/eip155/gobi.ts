import { gobi as vgobi } from "viem/chains";
import {type Chain} from "../chain";


export const gobi: Chain = {
	id: "eip155:" + vgobi.id,
	namespace: "eip155",
	vchain: vgobi,
};
