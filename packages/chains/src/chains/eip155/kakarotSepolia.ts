import { kakarotSepolia as vkakarotSepolia } from "viem/chains";
import {type Chain} from "../chain";


export const kakarotSepolia: Chain = {
	id: "eip155:" + vkakarotSepolia.id,
	namespace: "eip155",
	vchain: vkakarotSepolia,
};
