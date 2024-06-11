import { cronosTestnet as vcronosTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const cronosTestnet: Chain = {
	id: "eip155:" + vcronosTestnet.id,
	namespace: "eip155",
	vchain: vcronosTestnet,
};
