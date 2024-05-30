import { taikoHekla as vtaikoHekla } from "viem/chains";
import {Chain} from "../chain.js";


export const taikoHekla: Chain = {
	id: "eip155:" + vtaikoHekla.id,
	namespace: "eip155",
	vchain: vtaikoHekla,
};
