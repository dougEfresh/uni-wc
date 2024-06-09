import { eosTestnet as veosTestnet } from "viem/chains";
import {Chain} from "../chain";


export const eosTestnet: Chain = {
	id: "eip155:" + veosTestnet.id,
	namespace: "eip155",
	vchain: veosTestnet,
};
