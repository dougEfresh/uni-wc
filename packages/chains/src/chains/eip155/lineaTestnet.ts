import { lineaTestnet as vlineaTestnet } from "viem/chains";
import {Chain} from "../chain";


export const lineaTestnet: Chain = {
	id: "eip155:" + vlineaTestnet.id,
	namespace: "eip155",
	vchain: vlineaTestnet,
};
