import { cronos as vcronos } from "viem/chains";
import {type Chain} from "../chain";


export const cronos: Chain = {
	id: "eip155:" + vcronos.id,
	namespace: "eip155",
	vchain: vcronos,
};
