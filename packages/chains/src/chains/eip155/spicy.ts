import { spicy as vspicy } from "viem/chains";
import {Chain} from "../chain.js";


export const spicy: Chain = {
	id: "eip155:" + vspicy.id,
	namespace: "eip155",
	vchain: vspicy,
};
