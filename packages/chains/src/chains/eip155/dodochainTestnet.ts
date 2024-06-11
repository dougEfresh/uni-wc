import { dodochainTestnet as vdodochainTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const dodochainTestnet: Chain = {
	id: "eip155:" + vdodochainTestnet.id,
	namespace: "eip155",
	vchain: vdodochainTestnet,
};
