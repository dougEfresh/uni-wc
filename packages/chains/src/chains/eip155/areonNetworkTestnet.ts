import { areonNetworkTestnet as vareonNetworkTestnet } from "viem/chains";
import {Chain} from "../chain";


export const areonNetworkTestnet: Chain = {
	id: "eip155:" + vareonNetworkTestnet.id,
	namespace: "eip155",
	vchain: vareonNetworkTestnet,
};
