import { syscoinTestnet as vsyscoinTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const syscoinTestnet: Chain = {
	id: "eip155:" + vsyscoinTestnet.id,
	namespace: "eip155",
	vchain: vsyscoinTestnet,
};
