import { taikoKatla as vtaikoKatla } from "viem/chains";
import {type Chain} from "../chain";


export const taikoKatla: Chain = {
	id: "eip155:" + vtaikoKatla.id,
	namespace: "eip155",
	vchain: vtaikoKatla,
};
