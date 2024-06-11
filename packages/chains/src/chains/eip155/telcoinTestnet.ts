import { telcoinTestnet as vtelcoinTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const telcoinTestnet: Chain = {
	id: "eip155:" + vtelcoinTestnet.id,
	namespace: "eip155",
	vchain: vtelcoinTestnet,
};
