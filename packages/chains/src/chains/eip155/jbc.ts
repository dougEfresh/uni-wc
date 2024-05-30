import { jbc as vjbc } from "viem/chains";
import {Chain} from "../chain.js";


export const jbc: Chain = {
	id: "eip155:" + vjbc.id,
	namespace: "eip155",
	vchain: vjbc,
};
