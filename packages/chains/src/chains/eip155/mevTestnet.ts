import { mevTestnet as vmevTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const mevTestnet: Chain = {
	id: "eip155:" + vmevTestnet.id,
	namespace: "eip155",
	vchain: vmevTestnet,
};
