import { mev as vmev } from "viem/chains";
import {Chain} from "../chain";


export const mev: Chain = {
	id: "eip155:" + vmev.id,
	namespace: "eip155",
	vchain: vmev,
};
