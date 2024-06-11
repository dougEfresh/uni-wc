import { canto as vcanto } from "viem/chains";
import {type Chain} from "../chain";


export const canto: Chain = {
	id: "eip155:" + vcanto.id,
	namespace: "eip155",
	vchain: vcanto,
};
