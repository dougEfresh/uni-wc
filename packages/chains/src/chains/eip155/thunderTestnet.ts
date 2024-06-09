import { thunderTestnet as vthunderTestnet } from "viem/chains";
import {Chain} from "../chain";


export const thunderTestnet: Chain = {
	id: "eip155:" + vthunderTestnet.id,
	namespace: "eip155",
	vchain: vthunderTestnet,
};
