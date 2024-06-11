import { berachainTestnet as vberachainTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const berachainTestnet: Chain = {
	id: "eip155:" + vberachainTestnet.id,
	namespace: "eip155",
	vchain: vberachainTestnet,
};
