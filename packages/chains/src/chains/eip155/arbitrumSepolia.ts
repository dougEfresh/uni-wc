import { arbitrumSepolia as varbitrumSepolia } from "viem/chains";
import {Chain} from "../chain.js";


export const arbitrumSepolia: Chain = {
	id: "eip155:" + varbitrumSepolia.id,
	namespace: "eip155",
	vchain: varbitrumSepolia,
};
