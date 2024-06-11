import { zkSyncSepoliaTestnet as vzkSyncSepoliaTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const zkSyncSepoliaTestnet: Chain = {
	id: "eip155:" + vzkSyncSepoliaTestnet.id,
	namespace: "eip155",
	vchain: vzkSyncSepoliaTestnet,
};
