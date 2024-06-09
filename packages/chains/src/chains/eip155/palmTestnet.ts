import { palmTestnet as vpalmTestnet } from "viem/chains";
import {Chain} from "../chain";


export const palmTestnet: Chain = {
	id: "eip155:" + vpalmTestnet.id,
	namespace: "eip155",
	vchain: vpalmTestnet,
};
