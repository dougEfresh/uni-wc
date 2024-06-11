import { palmTestnet as vpalmTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const palmTestnet: Chain = {
	id: "eip155:" + vpalmTestnet.id,
	namespace: "eip155",
	vchain: vpalmTestnet,
};
