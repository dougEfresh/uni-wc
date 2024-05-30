import { metachainIstanbul as vmetachainIstanbul } from "viem/chains";
import {Chain} from "../chain.js";


export const metachainIstanbul: Chain = {
	id: "eip155:" + vmetachainIstanbul.id,
	namespace: "eip155",
	vchain: vmetachainIstanbul,
};
