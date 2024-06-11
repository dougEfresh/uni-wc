import { eos as veos } from "viem/chains";
import {type Chain} from "../chain";


export const eos: Chain = {
	id: "eip155:" + veos.id,
	namespace: "eip155",
	vchain: veos,
};
