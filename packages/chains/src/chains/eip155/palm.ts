import { palm as vpalm } from "viem/chains";
import {Chain} from "../chain";


export const palm: Chain = {
	id: "eip155:" + vpalm.id,
	namespace: "eip155",
	vchain: vpalm,
};
