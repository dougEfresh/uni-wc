import { scrollSepolia as vscrollSepolia } from "viem/chains";
import {type Chain} from "../chain";


export const scrollSepolia: Chain = {
	id: "eip155:" + vscrollSepolia.id,
	namespace: "eip155",
	vchain: vscrollSepolia,
};
