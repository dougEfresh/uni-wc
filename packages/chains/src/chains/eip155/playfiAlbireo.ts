import { playfiAlbireo as vplayfiAlbireo } from "viem/chains";
import {Chain} from "../chain.js";


export const playfiAlbireo: Chain = {
	id: "eip155:" + vplayfiAlbireo.id,
	namespace: "eip155",
	vchain: vplayfiAlbireo,
};
