import { jbcTestnet as vjbcTestnet } from "viem/chains";
import {Chain} from "../chain";


export const jbcTestnet: Chain = {
	id: "eip155:" + vjbcTestnet.id,
	namespace: "eip155",
	vchain: vjbcTestnet,
};
