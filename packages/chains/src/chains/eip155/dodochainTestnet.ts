import { dodochainTestnet as vdodochainTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const dodochainTestnet: Chain = {
	id: "eip155:" + vdodochainTestnet.id,
	namespace: "eip155",
	vchain: vdodochainTestnet,
};
