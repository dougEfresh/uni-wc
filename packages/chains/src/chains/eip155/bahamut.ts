import { bahamut as vbahamut } from "viem/chains";
import {Chain} from "../chain.js";


export const bahamut: Chain = {
	id: "eip155:" + vbahamut.id,
	namespace: "eip155",
	vchain: vbahamut,
};
