import { evmos as vevmos } from "viem/chains";
import {type Chain} from "../chain";


export const evmos: Chain = {
	id: "eip155:" + vevmos.id,
	namespace: "eip155",
	vchain: vevmos,
};
