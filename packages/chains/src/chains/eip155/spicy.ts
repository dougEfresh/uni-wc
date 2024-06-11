import { spicy as vspicy } from "viem/chains";
import {type Chain} from "../chain";


export const spicy: Chain = {
	id: "eip155:" + vspicy.id,
	namespace: "eip155",
	vchain: vspicy,
};
