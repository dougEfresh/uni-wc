import { btr as vbtr } from "viem/chains";
import {type Chain} from "../chain";


export const btr: Chain = {
	id: "eip155:" + vbtr.id,
	namespace: "eip155",
	vchain: vbtr,
};
