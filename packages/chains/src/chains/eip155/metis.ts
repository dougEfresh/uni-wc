import { metis as vmetis } from "viem/chains";
import {Chain} from "../chain.js";


export const metis: Chain = {
	id: "eip155:" + vmetis.id,
	namespace: "eip155",
	vchain: vmetis,
};
