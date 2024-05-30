import { fantomSonicTestnet as vfantomSonicTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const fantomSonicTestnet: Chain = {
	id: "eip155:" + vfantomSonicTestnet.id,
	namespace: "eip155",
	vchain: vfantomSonicTestnet,
};
