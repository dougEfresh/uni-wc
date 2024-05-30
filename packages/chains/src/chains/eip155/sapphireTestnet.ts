import { sapphireTestnet as vsapphireTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const sapphireTestnet: Chain = {
	id: "eip155:" + vsapphireTestnet.id,
	namespace: "eip155",
	vchain: vsapphireTestnet,
};
