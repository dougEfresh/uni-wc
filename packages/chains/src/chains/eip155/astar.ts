import { astar as vastar } from "viem/chains";
import {Chain} from "../chain.js";


export const astar: Chain = {
	id: "eip155:" + vastar.id,
	namespace: "eip155",
	vchain: vastar,
};
