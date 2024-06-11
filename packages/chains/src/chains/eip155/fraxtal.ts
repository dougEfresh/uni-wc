import { fraxtal as vfraxtal } from "viem/chains";
import {type Chain} from "../chain";


export const fraxtal: Chain = {
	id: "eip155:" + vfraxtal.id,
	namespace: "eip155",
	vchain: vfraxtal,
};
