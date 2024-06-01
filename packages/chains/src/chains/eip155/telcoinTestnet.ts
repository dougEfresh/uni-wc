import { telcoinTestnet as vtelcoinTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const telcoinTestnet: Chain = {
	id: "eip155:" + vtelcoinTestnet.id,
	namespace: "eip155",
	vchain: vtelcoinTestnet,
};