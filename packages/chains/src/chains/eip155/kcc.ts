import { kcc as vkcc } from "viem/chains";
import {Chain} from "../chain.js";


export const kcc: Chain = {
	id: "eip155:" + vkcc.id,
	namespace: "eip155",
	vchain: vkcc,
};
