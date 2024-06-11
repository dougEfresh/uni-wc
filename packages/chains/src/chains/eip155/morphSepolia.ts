import { morphSepolia as vmorphSepolia } from "viem/chains";
import {type Chain} from "../chain";


export const morphSepolia: Chain = {
	id: "eip155:" + vmorphSepolia.id,
	namespace: "eip155",
	vchain: vmorphSepolia,
};
