import { evmosTestnet as vevmosTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const evmosTestnet: Chain = {
	id: "eip155:" + vevmosTestnet.id,
	namespace: "eip155",
	vchain: vevmosTestnet,
};
