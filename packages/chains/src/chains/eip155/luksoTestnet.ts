import { luksoTestnet as vluksoTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const luksoTestnet: Chain = {
	id: "eip155:" + vluksoTestnet.id,
	namespace: "eip155",
	vchain: vluksoTestnet,
};
