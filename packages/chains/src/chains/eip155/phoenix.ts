import { phoenix as vphoenix } from "viem/chains";
import {Chain} from "../chain.js";


export const phoenix: Chain = {
	id: "eip155:" + vphoenix.id,
	namespace: "eip155",
	vchain: vphoenix,
};
