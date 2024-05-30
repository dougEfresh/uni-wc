import { mantle as vmantle } from "viem/chains";
import {Chain} from "../chain.js";


export const mantle: Chain = {
	id: "eip155:" + vmantle.id,
	namespace: "eip155",
	vchain: vmantle,
};
