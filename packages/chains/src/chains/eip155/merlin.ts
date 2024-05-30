import { merlin as vmerlin } from "viem/chains";
import {Chain} from "../chain.js";


export const merlin: Chain = {
	id: "eip155:" + vmerlin.id,
	namespace: "eip155",
	vchain: vmerlin,
};
