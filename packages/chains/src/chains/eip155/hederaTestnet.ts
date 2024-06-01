import { hederaTestnet as vhederaTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const hederaTestnet: Chain = {
	id: "eip155:" + vhederaTestnet.id,
	namespace: "eip155",
	vchain: vhederaTestnet,
};