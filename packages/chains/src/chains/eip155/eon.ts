import { eon as veon } from "viem/chains";
import {type Chain} from "../chain";


export const eon: Chain = {
	id: "eip155:" + veon.id,
	namespace: "eip155",
	vchain: veon,
};
