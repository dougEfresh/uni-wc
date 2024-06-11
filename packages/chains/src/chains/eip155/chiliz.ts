import { chiliz as vchiliz } from "viem/chains";
import {type Chain} from "../chain";


export const chiliz: Chain = {
	id: "eip155:" + vchiliz.id,
	namespace: "eip155",
	vchain: vchiliz,
};
