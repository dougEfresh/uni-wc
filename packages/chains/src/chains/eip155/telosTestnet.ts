import { telosTestnet as vtelosTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const telosTestnet: Chain = {
	id: "eip155:" + vtelosTestnet.id,
	namespace: "eip155",
	vchain: vtelosTestnet,
};
