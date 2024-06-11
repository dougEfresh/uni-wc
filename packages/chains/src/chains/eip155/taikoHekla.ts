import { taikoHekla as vtaikoHekla } from "viem/chains";
import {type Chain} from "../chain";


export const taikoHekla: Chain = {
	id: "eip155:" + vtaikoHekla.id,
	namespace: "eip155",
	vchain: vtaikoHekla,
};
