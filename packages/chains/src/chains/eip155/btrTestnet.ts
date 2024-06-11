import { btrTestnet as vbtrTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const btrTestnet: Chain = {
	id: "eip155:" + vbtrTestnet.id,
	namespace: "eip155",
	vchain: vbtrTestnet,
};
