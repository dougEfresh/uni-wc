import { cronosTestnet as vcronosTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const cronosTestnet: Chain = {
	id: "eip155:" + vcronosTestnet.id,
	namespace: "eip155",
	vchain: vcronosTestnet,
};
