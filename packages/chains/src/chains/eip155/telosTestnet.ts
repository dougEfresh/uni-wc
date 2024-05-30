import { telosTestnet as vtelosTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const telosTestnet: Chain = {
	id: "eip155:" + vtelosTestnet.id,
	namespace: "eip155",
	vchain: vtelosTestnet,
};
