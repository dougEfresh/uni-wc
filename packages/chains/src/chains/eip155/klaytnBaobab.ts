import { klaytnBaobab as vklaytnBaobab } from "viem/chains";
import {Chain} from "../chain.js";


export const klaytnBaobab: Chain = {
	id: "eip155:" + vklaytnBaobab.id,
	namespace: "eip155",
	vchain: vklaytnBaobab,
};
