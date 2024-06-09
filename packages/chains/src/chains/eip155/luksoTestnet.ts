import { luksoTestnet as vluksoTestnet } from "viem/chains";
import {Chain} from "../chain";


export const luksoTestnet: Chain = {
	id: "eip155:" + vluksoTestnet.id,
	namespace: "eip155",
	vchain: vluksoTestnet,
};
