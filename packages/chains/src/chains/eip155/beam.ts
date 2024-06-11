import { beam as vbeam } from "viem/chains";
import {type Chain} from "../chain";


export const beam: Chain = {
	id: "eip155:" + vbeam.id,
	namespace: "eip155",
	vchain: vbeam,
};
