import { celoAlfajores as vceloAlfajores } from "viem/chains";
import {type Chain} from "../chain";


export const celoAlfajores: Chain = {
	id: "eip155:" + vceloAlfajores.id,
	namespace: "eip155",
	vchain: vceloAlfajores,
};
