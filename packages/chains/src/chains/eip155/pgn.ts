import { pgn as vpgn } from "viem/chains";
import {type Chain} from "../chain";


export const pgn: Chain = {
	id: "eip155:" + vpgn.id,
	namespace: "eip155",
	vchain: vpgn,
};
