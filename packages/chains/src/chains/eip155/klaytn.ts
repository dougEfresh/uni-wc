import { klaytn as vklaytn } from "viem/chains";
import {type Chain} from "../chain";


export const klaytn: Chain = {
	id: "eip155:" + vklaytn.id,
	namespace: "eip155",
	vchain: vklaytn,
};
