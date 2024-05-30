import { xLayerTestnet as vxLayerTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const xLayerTestnet: Chain = {
	id: "eip155:" + vxLayerTestnet.id,
	namespace: "eip155",
	vchain: vxLayerTestnet,
};
