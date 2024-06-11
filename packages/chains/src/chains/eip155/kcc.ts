import { kcc as vkcc } from "viem/chains";
import {type Chain} from "../chain";


export const kcc: Chain = {
	id: "eip155:" + vkcc.id,
	namespace: "eip155",
	vchain: vkcc,
};
