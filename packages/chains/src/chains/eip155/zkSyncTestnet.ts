import { zkSyncTestnet as vzkSyncTestnet } from "viem/chains";
import {Chain} from "../chain";


export const zkSyncTestnet: Chain = {
	id: "eip155:" + vzkSyncTestnet.id,
	namespace: "eip155",
	vchain: vzkSyncTestnet,
};
