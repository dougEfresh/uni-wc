import { zetachainAthensTestnet as vzetachainAthensTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const zetachainAthensTestnet: Chain = {
	id: "eip155:" + vzetachainAthensTestnet.id,
	namespace: "eip155",
	vchain: vzetachainAthensTestnet,
};
