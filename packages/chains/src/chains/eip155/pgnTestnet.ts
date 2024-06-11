import { pgnTestnet as vpgnTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const pgnTestnet: Chain = {
	id: "eip155:" + vpgnTestnet.id,
	namespace: "eip155",
	vchain: vpgnTestnet,
};
