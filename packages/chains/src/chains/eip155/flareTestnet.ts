import { flareTestnet as vflareTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const flareTestnet: Chain = {
	id: "eip155:" + vflareTestnet.id,
	namespace: "eip155",
	vchain: vflareTestnet,
};
