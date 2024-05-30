import { classic as vclassic } from "viem/chains";
import {Chain} from "../chain.js";


export const classic: Chain = {
	id: "eip155:" + vclassic.id,
	namespace: "eip155",
	vchain: vclassic,
};
