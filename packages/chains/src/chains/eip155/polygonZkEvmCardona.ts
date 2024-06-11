import { polygonZkEvmCardona as vpolygonZkEvmCardona } from "viem/chains";
import {type Chain} from "../chain";


export const polygonZkEvmCardona: Chain = {
	id: "eip155:" + vpolygonZkEvmCardona.id,
	namespace: "eip155",
	vchain: vpolygonZkEvmCardona,
};
