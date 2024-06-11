import { defichainEvmTestnet as vdefichainEvmTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const defichainEvmTestnet: Chain = {
	id: "eip155:" + vdefichainEvmTestnet.id,
	namespace: "eip155",
	vchain: vdefichainEvmTestnet,
};
