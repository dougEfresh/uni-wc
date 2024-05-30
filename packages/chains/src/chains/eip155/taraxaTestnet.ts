import { taraxaTestnet as vtaraxaTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const taraxaTestnet: Chain = {
	id: "eip155:" + vtaraxaTestnet.id,
	namespace: "eip155",
	vchain: vtaraxaTestnet,
};
