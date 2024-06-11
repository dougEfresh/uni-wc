import { fibo as vfibo } from "viem/chains";
import {type Chain} from "../chain";


export const fibo: Chain = {
	id: "eip155:" + vfibo.id,
	namespace: "eip155",
	vchain: vfibo,
};
