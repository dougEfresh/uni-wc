import { mantleTestnet as vmantleTestnet } from "viem/chains";
import {Chain} from "../chain";


export const mantleTestnet: Chain = {
	id: "eip155:" + vmantleTestnet.id,
	namespace: "eip155",
	vchain: vmantleTestnet,
};
