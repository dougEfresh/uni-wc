import { defichainEvmTestnet as vdefichainEvmTestnet } from "viem/chains";
import {Chain} from "../chain";


export const defichainEvmTestnet: Chain = {
	id: "eip155:" + vdefichainEvmTestnet.id,
	namespace: "eip155",
	vchain: vdefichainEvmTestnet,
};
