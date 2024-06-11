import { zoraTestnet as vzoraTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const zoraTestnet: Chain = {
	id: "eip155:" + vzoraTestnet.id,
	namespace: "eip155",
	vchain: vzoraTestnet,
};
