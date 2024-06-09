import { wemixTestnet as vwemixTestnet } from "viem/chains";
import {Chain} from "../chain";


export const wemixTestnet: Chain = {
	id: "eip155:" + vwemixTestnet.id,
	namespace: "eip155",
	vchain: vwemixTestnet,
};
