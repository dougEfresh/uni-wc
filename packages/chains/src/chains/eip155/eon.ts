import { eon as veon } from "viem/chains";
import {Chain} from "../chain";


export const eon: Chain = {
	id: "eip155:" + veon.id,
	namespace: "eip155",
	vchain: veon,
};
