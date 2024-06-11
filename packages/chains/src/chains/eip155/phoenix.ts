import { phoenix as vphoenix } from "viem/chains";
import {type Chain} from "../chain";


export const phoenix: Chain = {
	id: "eip155:" + vphoenix.id,
	namespace: "eip155",
	vchain: vphoenix,
};
