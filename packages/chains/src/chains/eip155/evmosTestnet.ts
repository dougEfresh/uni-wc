import { evmosTestnet as vevmosTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const evmosTestnet: Chain = {
	id: "eip155:" + vevmosTestnet.id,
	namespace: "eip155",
	vchain: vevmosTestnet,
};
