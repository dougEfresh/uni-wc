import { opBNB as vopBNB } from "viem/chains";
import {type Chain} from "../chain";


export const opBNB: Chain = {
	id: "eip155:" + vopBNB.id,
	namespace: "eip155",
	vchain: vopBNB,
};
