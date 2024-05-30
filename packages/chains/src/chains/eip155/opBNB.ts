import { opBNB as vopBNB } from "viem/chains";
import {Chain} from "../chain.js";


export const opBNB: Chain = {
	id: "eip155:" + vopBNB.id,
	namespace: "eip155",
	vchain: vopBNB,
};
