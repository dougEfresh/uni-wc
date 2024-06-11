import { zkSyncLocalNode as vzkSyncLocalNode } from "viem/chains";
import {type Chain} from "../chain";


export const zkSyncLocalNode: Chain = {
	id: "eip155:" + vzkSyncLocalNode.id,
	namespace: "eip155",
	vchain: vzkSyncLocalNode,
};
