import { classic as vclassic } from "viem/chains";
import {type Chain} from "../chain";


export const classic: Chain = {
	id: "eip155:" + vclassic.id,
	namespace: "eip155",
	vchain: vclassic,
};
