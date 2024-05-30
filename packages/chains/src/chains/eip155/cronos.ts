import { cronos as vcronos } from "viem/chains";
import {Chain} from "../chain.js";


export const cronos: Chain = {
	id: "eip155:" + vcronos.id,
	namespace: "eip155",
	vchain: vcronos,
};
