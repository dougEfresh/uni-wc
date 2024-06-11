import { harmonyOne as vharmonyOne } from "viem/chains";
import {type Chain} from "../chain";


export const harmonyOne: Chain = {
	id: "eip155:" + vharmonyOne.id,
	namespace: "eip155",
	vchain: vharmonyOne,
};
