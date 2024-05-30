import { celoAlfajores as vceloAlfajores } from "viem/chains";
import {Chain} from "../chain.js";


export const celoAlfajores: Chain = {
	id: "eip155:" + vceloAlfajores.id,
	namespace: "eip155",
	vchain: vceloAlfajores,
};
