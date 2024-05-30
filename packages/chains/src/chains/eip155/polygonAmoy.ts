import { polygonAmoy as vpolygonAmoy } from "viem/chains";
import {Chain} from "../chain.js";


export const polygonAmoy: Chain = {
	id: "eip155:" + vpolygonAmoy.id,
	namespace: "eip155",
	vchain: vpolygonAmoy,
};
