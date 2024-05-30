import { bearNetworkChainMainnet as vbearNetworkChainMainnet } from "viem/chains";
import {Chain} from "../chain.js";


export const bearNetworkChainMainnet: Chain = {
	id: "eip155:" + vbearNetworkChainMainnet.id,
	namespace: "eip155",
	vchain: vbearNetworkChainMainnet,
};
