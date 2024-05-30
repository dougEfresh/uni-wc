import { zoraTestnet as vzoraTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const zoraTestnet: Chain = {
	id: "eip155:" + vzoraTestnet.id,
	namespace: "eip155",
	vchain: vzoraTestnet,
};
