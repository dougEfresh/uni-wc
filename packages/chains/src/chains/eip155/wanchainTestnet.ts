import { wanchainTestnet as vwanchainTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const wanchainTestnet: Chain = {
	id: "eip155:" + vwanchainTestnet.id,
	namespace: "eip155",
	vchain: vwanchainTestnet,
};
