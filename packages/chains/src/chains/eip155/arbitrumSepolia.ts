import { arbitrumSepolia as varbitrumSepolia } from "viem/chains";
import {type Chain} from "../chain";


export const arbitrumSepolia: Chain = {
	id: "eip155:" + varbitrumSepolia.id,
	namespace: "eip155",
	vchain: varbitrumSepolia,
};
