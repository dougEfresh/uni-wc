import { xdc as vxdc } from "viem/chains";
import {Chain} from "../chain";


export const xdc: Chain = {
	id: "eip155:" + vxdc.id,
	namespace: "eip155",
	vchain: vxdc,
};
