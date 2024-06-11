import { polygon as vpolygon } from "viem/chains";
import {type Chain} from "../chain";


export const polygon: Chain = {
	id: "eip155:" + vpolygon.id,
	namespace: "eip155",
	vchain: vpolygon,
};
