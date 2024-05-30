import { evmos as vevmos } from "viem/chains";
import {Chain} from "../chain.js";


export const evmos: Chain = {
	id: "eip155:" + vevmos.id,
	namespace: "eip155",
	vchain: vevmos,
};
