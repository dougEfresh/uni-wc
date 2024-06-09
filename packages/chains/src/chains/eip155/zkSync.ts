import { zkSync as vzkSync } from "viem/chains";
import {Chain} from "../chain";


export const zkSync: Chain = {
	id: "eip155:" + vzkSync.id,
	namespace: "eip155",
	vchain: vzkSync,
};
