import { ekta as vekta } from "viem/chains";
import {Chain} from "../chain.js";


export const ekta: Chain = {
	id: "eip155:" + vekta.id,
	namespace: "eip155",
	vchain: vekta,
};
