import { pulsechainV4 as vpulsechainV4 } from "viem/chains";
import {type Chain} from "../chain";


export const pulsechainV4: Chain = {
	id: "eip155:" + vpulsechainV4.id,
	namespace: "eip155",
	vchain: vpulsechainV4,
};
