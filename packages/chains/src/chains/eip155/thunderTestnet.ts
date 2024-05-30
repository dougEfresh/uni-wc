import { thunderTestnet as vthunderTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const thunderTestnet: Chain = {
	id: "eip155:" + vthunderTestnet.id,
	namespace: "eip155",
	vchain: vthunderTestnet,
};
