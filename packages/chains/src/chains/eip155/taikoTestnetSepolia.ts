import { taikoTestnetSepolia as vtaikoTestnetSepolia } from "viem/chains";
import {type Chain} from "../chain";


export const taikoTestnetSepolia: Chain = {
	id: "eip155:" + vtaikoTestnetSepolia.id,
	namespace: "eip155",
	vchain: vtaikoTestnetSepolia,
};
