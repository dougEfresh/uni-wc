import { okc as vokc } from "viem/chains";
import {type Chain} from "../chain";


export const okc: Chain = {
	id: "eip155:" + vokc.id,
	namespace: "eip155",
	vchain: vokc,
};
