import { pgnTestnet as vpgnTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const pgnTestnet: Chain = {
	id: "eip155:" + vpgnTestnet.id,
	namespace: "eip155",
	vchain: vpgnTestnet,
};
