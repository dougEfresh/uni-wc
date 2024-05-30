import { scrollTestnet as vscrollTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const scrollTestnet: Chain = {
	id: "eip155:" + vscrollTestnet.id,
	namespace: "eip155",
	vchain: vscrollTestnet,
};
