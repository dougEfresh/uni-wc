import { bronos as vbronos } from "viem/chains";
import {type Chain} from "../chain";


export const bronos: Chain = {
	id: "eip155:" + vbronos.id,
	namespace: "eip155",
	vchain: vbronos,
};
