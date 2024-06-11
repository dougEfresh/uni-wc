import { metis as vmetis } from "viem/chains";
import {type Chain} from "../chain";


export const metis: Chain = {
	id: "eip155:" + vmetis.id,
	namespace: "eip155",
	vchain: vmetis,
};
