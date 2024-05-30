import { mintSepoliaTestnet as vmintSepoliaTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const mintSepoliaTestnet: Chain = {
	id: "eip155:" + vmintSepoliaTestnet.id,
	namespace: "eip155",
	vchain: vmintSepoliaTestnet,
};
