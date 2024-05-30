import { hedera as vhedera } from "viem/chains";
import {Chain} from "../chain.js";


export const hedera: Chain = {
	id: "eip155:" + vhedera.id,
	namespace: "eip155",
	vchain: vhedera,
};
