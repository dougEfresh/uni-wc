import { beam as vbeam } from "viem/chains";
import {Chain} from "../chain.js";


export const beam: Chain = {
	id: "eip155:" + vbeam.id,
	namespace: "eip155",
	vchain: vbeam,
};
