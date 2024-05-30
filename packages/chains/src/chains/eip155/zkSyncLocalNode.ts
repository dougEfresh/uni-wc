import { zkSyncLocalNode as vzkSyncLocalNode } from "viem/chains";
import {Chain} from "../chain.js";


export const zkSyncLocalNode: Chain = {
	id: "eip155:" + vzkSyncLocalNode.id,
	namespace: "eip155",
	vchain: vzkSyncLocalNode,
};
