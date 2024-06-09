import { polygonMumbai as vpolygonMumbai } from "viem/chains";
import {Chain} from "../chain";


export const polygonMumbai: Chain = {
	id: "eip155:" + vpolygonMumbai.id,
	namespace: "eip155",
	vchain: vpolygonMumbai,
};
