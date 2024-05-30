import { flareTestnet as vflareTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const flareTestnet: Chain = {
	id: "eip155:" + vflareTestnet.id,
	namespace: "eip155",
	vchain: vflareTestnet,
};
