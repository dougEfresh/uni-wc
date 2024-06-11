import { jbc as vjbc } from "viem/chains";
import {type Chain} from "../chain";


export const jbc: Chain = {
	id: "eip155:" + vjbc.id,
	namespace: "eip155",
	vchain: vjbc,
};
