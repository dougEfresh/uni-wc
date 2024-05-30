import { boba as vboba } from "viem/chains";
import {Chain} from "../chain.js";


export const boba: Chain = {
	id: "eip155:" + vboba.id,
	namespace: "eip155",
	vchain: vboba,
};
