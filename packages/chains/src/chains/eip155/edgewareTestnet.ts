import { edgewareTestnet as vedgewareTestnet } from "viem/chains";
import {Chain} from "../chain";


export const edgewareTestnet: Chain = {
	id: "eip155:" + vedgewareTestnet.id,
	namespace: "eip155",
	vchain: vedgewareTestnet,
};
