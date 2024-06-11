import { lineaTestnet as vlineaTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const lineaTestnet: Chain = {
	id: "eip155:" + vlineaTestnet.id,
	namespace: "eip155",
	vchain: vlineaTestnet,
};
