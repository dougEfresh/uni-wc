import { eon as veon } from "viem/chains";
import {Chain} from "../chain.js";


export const eon: Chain = {
	id: "eip155:" + veon.id,
	namespace: "eip155",
	vchain: veon,
};
