import { hederaTestnet as vhederaTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const hederaTestnet: Chain = {
	id: "eip155:" + vhederaTestnet.id,
	namespace: "eip155",
	vchain: vhederaTestnet,
};
