import { xdcTestnet as vxdcTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const xdcTestnet: Chain = {
	id: "eip155:" + vxdcTestnet.id,
	namespace: "eip155",
	vchain: vxdcTestnet,
};
