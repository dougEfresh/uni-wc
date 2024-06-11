import { ektaTestnet as vektaTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const ektaTestnet: Chain = {
	id: "eip155:" + vektaTestnet.id,
	namespace: "eip155",
	vchain: vektaTestnet,
};
