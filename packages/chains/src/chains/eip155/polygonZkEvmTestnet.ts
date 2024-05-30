import { polygonZkEvmTestnet as vpolygonZkEvmTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const polygonZkEvmTestnet: Chain = {
	id: "eip155:" + vpolygonZkEvmTestnet.id,
	namespace: "eip155",
	vchain: vpolygonZkEvmTestnet,
};
