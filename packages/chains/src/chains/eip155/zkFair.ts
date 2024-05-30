import { zkFair as vzkFair } from "viem/chains";
import {Chain} from "../chain.js";


export const zkFair: Chain = {
	id: "eip155:" + vzkFair.id,
	namespace: "eip155",
	vchain: vzkFair,
};
