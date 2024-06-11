import { wemixTestnet as vwemixTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const wemixTestnet: Chain = {
	id: "eip155:" + vwemixTestnet.id,
	namespace: "eip155",
	vchain: vwemixTestnet,
};
