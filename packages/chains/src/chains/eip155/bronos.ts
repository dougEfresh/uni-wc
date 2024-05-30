import { bronos as vbronos } from "viem/chains";
import {Chain} from "../chain.js";


export const bronos: Chain = {
	id: "eip155:" + vbronos.id,
	namespace: "eip155",
	vchain: vbronos,
};
