import { taikoKatla as vtaikoKatla } from "viem/chains";
import {Chain} from "../chain.js";


export const taikoKatla: Chain = {
	id: "eip155:" + vtaikoKatla.id,
	namespace: "eip155",
	vchain: vtaikoKatla,
};