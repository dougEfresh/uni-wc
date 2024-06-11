import { edgewareTestnet as vedgewareTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const edgewareTestnet: Chain = {
	id: "eip155:" + vedgewareTestnet.id,
	namespace: "eip155",
	vchain: vedgewareTestnet,
};
