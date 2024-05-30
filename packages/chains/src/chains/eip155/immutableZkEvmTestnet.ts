import { immutableZkEvmTestnet as vimmutableZkEvmTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const immutableZkEvmTestnet: Chain = {
	id: "eip155:" + vimmutableZkEvmTestnet.id,
	namespace: "eip155",
	vchain: vimmutableZkEvmTestnet,
};
