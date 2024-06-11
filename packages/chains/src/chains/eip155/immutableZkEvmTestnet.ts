import { immutableZkEvmTestnet as vimmutableZkEvmTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const immutableZkEvmTestnet: Chain = {
	id: "eip155:" + vimmutableZkEvmTestnet.id,
	namespace: "eip155",
	vchain: vimmutableZkEvmTestnet,
};
