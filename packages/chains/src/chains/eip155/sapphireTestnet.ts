import { sapphireTestnet as vsapphireTestnet } from "viem/chains";
import {Chain} from "../chain";


export const sapphireTestnet: Chain = {
	id: "eip155:" + vsapphireTestnet.id,
	namespace: "eip155",
	vchain: vsapphireTestnet,
};
