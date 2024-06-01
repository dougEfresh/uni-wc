import { kakarotSepolia as vkakarotSepolia } from "viem/chains";
import {Chain} from "../chain.js";


export const kakarotSepolia: Chain = {
	id: "eip155:" + vkakarotSepolia.id,
	namespace: "eip155",
	vchain: vkakarotSepolia,
};