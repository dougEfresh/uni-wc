import { mantaSepoliaTestnet as vmantaSepoliaTestnet } from "viem/chains";
import {Chain} from "../chain";


export const mantaSepoliaTestnet: Chain = {
	id: "eip155:" + vmantaSepoliaTestnet.id,
	namespace: "eip155",
	vchain: vmantaSepoliaTestnet,
};
