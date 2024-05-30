import { zkSyncInMemoryNode as vzkSyncInMemoryNode } from "viem/chains";
import {Chain} from "../chain.js";


export const zkSyncInMemoryNode: Chain = {
	id: "eip155:" + vzkSyncInMemoryNode.id,
	namespace: "eip155",
	vchain: vzkSyncInMemoryNode,
};
