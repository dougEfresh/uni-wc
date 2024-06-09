import { syscoinTestnet as vsyscoinTestnet } from "viem/chains";
import {Chain} from "../chain";


export const syscoinTestnet: Chain = {
	id: "eip155:" + vsyscoinTestnet.id,
	namespace: "eip155",
	vchain: vsyscoinTestnet,
};
