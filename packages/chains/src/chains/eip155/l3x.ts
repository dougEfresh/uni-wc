import { l3x as vl3x } from "viem/chains";
import {Chain} from "../chain.js";


export const l3x: Chain = {
	id: "eip155:" + vl3x.id,
	namespace: "eip155",
	vchain: vl3x,
};
