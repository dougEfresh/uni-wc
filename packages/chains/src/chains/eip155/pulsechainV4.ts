import { pulsechainV4 as vpulsechainV4 } from "viem/chains";
import {Chain} from "../chain.js";


export const pulsechainV4: Chain = {
	id: "eip155:" + vpulsechainV4.id,
	namespace: "eip155",
	vchain: vpulsechainV4,
};
