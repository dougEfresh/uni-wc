import { rollux as vrollux } from "viem/chains";
import {Chain} from "../chain.js";


export const rollux: Chain = {
	id: "eip155:" + vrollux.id,
	namespace: "eip155",
	vchain: vrollux,
};
