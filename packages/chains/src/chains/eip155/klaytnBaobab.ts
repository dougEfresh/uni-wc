import { klaytnBaobab as vklaytnBaobab } from "viem/chains";
import {Chain} from "../chain";


export const klaytnBaobab: Chain = {
	id: "eip155:" + vklaytnBaobab.id,
	namespace: "eip155",
	vchain: vklaytnBaobab,
};
