import { hedera as vhedera } from "viem/chains";
import {type Chain} from "../chain";


export const hedera: Chain = {
	id: "eip155:" + vhedera.id,
	namespace: "eip155",
	vchain: vhedera,
};
