import { polygon as vpolygon } from "viem/chains";
import {Chain} from "../chain.js";


export const polygon: Chain = {
	id: "eip155:" + vpolygon.id,
	namespace: "eip155",
	vchain: vpolygon,
};
