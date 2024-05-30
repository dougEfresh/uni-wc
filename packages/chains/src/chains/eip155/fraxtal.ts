import { fraxtal as vfraxtal } from "viem/chains";
import {Chain} from "../chain.js";


export const fraxtal: Chain = {
	id: "eip155:" + vfraxtal.id,
	namespace: "eip155",
	vchain: vfraxtal,
};
