import { opBNBTestnet as vopBNBTestnet } from "viem/chains";
import {Chain} from "../chain";


export const opBNBTestnet: Chain = {
	id: "eip155:" + vopBNBTestnet.id,
	namespace: "eip155",
	vchain: vopBNBTestnet,
};
