import { scroll as vscroll } from "viem/chains";
import {Chain} from "../chain.js";


export const scroll: Chain = {
	id: "eip155:" + vscroll.id,
	namespace: "eip155",
	vchain: vscroll,
};
