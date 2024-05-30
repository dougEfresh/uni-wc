import { cyberTestnet as vcyberTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const cyberTestnet: Chain = {
	id: "eip155:" + vcyberTestnet.id,
	namespace: "eip155",
	vchain: vcyberTestnet,
};
