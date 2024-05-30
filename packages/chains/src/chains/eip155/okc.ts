import { okc as vokc } from "viem/chains";
import {Chain} from "../chain.js";


export const okc: Chain = {
	id: "eip155:" + vokc.id,
	namespace: "eip155",
	vchain: vokc,
};
