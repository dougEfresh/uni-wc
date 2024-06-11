import { polygonZkEvm as vpolygonZkEvm } from "viem/chains";
import {type Chain} from "../chain";


export const polygonZkEvm: Chain = {
	id: "eip155:" + vpolygonZkEvm.id,
	namespace: "eip155",
	vchain: vpolygonZkEvm,
};
