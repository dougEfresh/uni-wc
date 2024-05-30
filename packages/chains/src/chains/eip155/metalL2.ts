import { metalL2 as vmetalL2 } from "viem/chains";
import {Chain} from "../chain.js";


export const metalL2: Chain = {
	id: "eip155:" + vmetalL2.id,
	namespace: "eip155",
	vchain: vmetalL2,
};
