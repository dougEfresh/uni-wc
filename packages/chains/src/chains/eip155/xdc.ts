import { xdc as vxdc } from "viem/chains";
import {type Chain} from "../chain";


export const xdc: Chain = {
	id: "eip155:" + vxdc.id,
	namespace: "eip155",
	vchain: vxdc,
};
