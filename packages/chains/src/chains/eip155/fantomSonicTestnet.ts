import { fantomSonicTestnet as vfantomSonicTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const fantomSonicTestnet: Chain = {
	id: "eip155:" + vfantomSonicTestnet.id,
	namespace: "eip155",
	vchain: vfantomSonicTestnet,
};
