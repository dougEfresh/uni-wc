import { xdcTestnet as vxdcTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const xdcTestnet: Chain = {
	id: "eip155:" + vxdcTestnet.id,
	namespace: "eip155",
	vchain: vxdcTestnet,
};
