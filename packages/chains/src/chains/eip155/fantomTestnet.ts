import { fantomTestnet as vfantomTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const fantomTestnet: Chain = {
	id: "eip155:" + vfantomTestnet.id,
	namespace: "eip155",
	vchain: vfantomTestnet,
};
