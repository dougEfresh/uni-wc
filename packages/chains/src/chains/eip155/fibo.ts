import { fibo as vfibo } from "viem/chains";
import {Chain} from "../chain.js";


export const fibo: Chain = {
	id: "eip155:" + vfibo.id,
	namespace: "eip155",
	vchain: vfibo,
};
