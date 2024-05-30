import { btr as vbtr } from "viem/chains";
import {Chain} from "../chain.js";


export const btr: Chain = {
	id: "eip155:" + vbtr.id,
	namespace: "eip155",
	vchain: vbtr,
};
