import { mantleSepoliaTestnet as vmantleSepoliaTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const mantleSepoliaTestnet: Chain = {
	id: "eip155:" + vmantleSepoliaTestnet.id,
	namespace: "eip155",
	vchain: vmantleSepoliaTestnet,
};
