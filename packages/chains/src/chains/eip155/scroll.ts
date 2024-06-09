import { scroll as vscroll } from "viem/chains";
import {Chain} from "../chain";


export const scroll: Chain = {
	id: "eip155:" + vscroll.id,
	namespace: "eip155",
	vchain: vscroll,
};
