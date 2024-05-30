import { taikoTestnetSepolia as vtaikoTestnetSepolia } from "viem/chains";
import {Chain} from "../chain.js";


export const taikoTestnetSepolia: Chain = {
	id: "eip155:" + vtaikoTestnetSepolia.id,
	namespace: "eip155",
	vchain: vtaikoTestnetSepolia,
};
