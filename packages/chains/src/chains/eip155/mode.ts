import { mode as vmode } from "viem/chains";
import {Chain} from "../chain";


export const mode: Chain = {
	id: "eip155:" + vmode.id,
	namespace: "eip155",
	vchain: vmode,
};
