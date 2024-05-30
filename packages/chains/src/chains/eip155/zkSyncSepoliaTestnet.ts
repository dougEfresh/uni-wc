import { zkSyncSepoliaTestnet as vzkSyncSepoliaTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const zkSyncSepoliaTestnet: Chain = {
	id: "eip155:" + vzkSyncSepoliaTestnet.id,
	namespace: "eip155",
	vchain: vzkSyncSepoliaTestnet,
};
