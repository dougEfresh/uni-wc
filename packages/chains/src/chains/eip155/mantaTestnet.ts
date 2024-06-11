import { mantaTestnet as vmantaTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const mantaTestnet: Chain = {
	id: "eip155:" + vmantaTestnet.id,
	namespace: "eip155",
	vchain: vmantaTestnet,
};
