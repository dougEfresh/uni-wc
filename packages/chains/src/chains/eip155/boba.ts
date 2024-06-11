import { boba as vboba } from "viem/chains";
import {type Chain} from "../chain";


export const boba: Chain = {
	id: "eip155:" + vboba.id,
	namespace: "eip155",
	vchain: vboba,
};
