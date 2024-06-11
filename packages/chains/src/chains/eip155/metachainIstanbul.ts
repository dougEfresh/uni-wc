import { metachainIstanbul as vmetachainIstanbul } from "viem/chains";
import {type Chain} from "../chain";


export const metachainIstanbul: Chain = {
	id: "eip155:" + vmetachainIstanbul.id,
	namespace: "eip155",
	vchain: vmetachainIstanbul,
};
