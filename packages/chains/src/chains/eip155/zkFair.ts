import { zkFair as vzkFair } from "viem/chains";
import {type Chain} from "../chain";


export const zkFair: Chain = {
	id: "eip155:" + vzkFair.id,
	namespace: "eip155",
	vchain: vzkFair,
};
