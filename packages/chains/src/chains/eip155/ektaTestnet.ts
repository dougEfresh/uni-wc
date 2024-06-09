import { ektaTestnet as vektaTestnet } from "viem/chains";
import {Chain} from "../chain";


export const ektaTestnet: Chain = {
	id: "eip155:" + vektaTestnet.id,
	namespace: "eip155",
	vchain: vektaTestnet,
};
