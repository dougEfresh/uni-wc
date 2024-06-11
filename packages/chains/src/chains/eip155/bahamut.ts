import { bahamut as vbahamut } from "viem/chains";
import {type Chain} from "../chain";


export const bahamut: Chain = {
	id: "eip155:" + vbahamut.id,
	namespace: "eip155",
	vchain: vbahamut,
};
