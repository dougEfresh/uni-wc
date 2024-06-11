import { taraxaTestnet as vtaraxaTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const taraxaTestnet: Chain = {
	id: "eip155:" + vtaraxaTestnet.id,
	namespace: "eip155",
	vchain: vtaraxaTestnet,
};
