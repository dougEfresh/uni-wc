import { eos as veos } from "viem/chains";
import {Chain} from "../chain.js";


export const eos: Chain = {
	id: "eip155:" + veos.id,
	namespace: "eip155",
	vchain: veos,
};
