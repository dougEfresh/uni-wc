import { zkSyncInMemoryNode as vzkSyncInMemoryNode } from "viem/chains";
import {type Chain} from "../chain";


export const zkSyncInMemoryNode: Chain = {
	id: "eip155:" + vzkSyncInMemoryNode.id,
	namespace: "eip155",
	vchain: vzkSyncInMemoryNode,
};
