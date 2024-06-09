import { bearNetworkChainTestnet as vbearNetworkChainTestnet } from "viem/chains";
import {Chain} from "../chain";


export const bearNetworkChainTestnet: Chain = {
	id: "eip155:" + vbearNetworkChainTestnet.id,
	namespace: "eip155",
	vchain: vbearNetworkChainTestnet,
};
