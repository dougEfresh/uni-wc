import { pgn as vpgn } from "viem/chains";
import {Chain} from "../chain.js";


export const pgn: Chain = {
	id: "eip155:" + vpgn.id,
	namespace: "eip155",
	vchain: vpgn,
};
