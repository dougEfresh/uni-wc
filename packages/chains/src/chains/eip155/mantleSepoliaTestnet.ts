import { mantleSepoliaTestnet as vmantleSepoliaTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const mantleSepoliaTestnet: Chain = {
	id: "eip155:" + vmantleSepoliaTestnet.id,
	namespace: "eip155",
	vchain: vmantleSepoliaTestnet,
};
