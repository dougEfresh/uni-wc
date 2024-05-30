import { funkiSepolia as vfunkiSepolia } from "viem/chains";
import {Chain} from "../chain.js";


export const funkiSepolia: Chain = {
	id: "eip155:" + vfunkiSepolia.id,
	namespace: "eip155",
	vchain: vfunkiSepolia,
};
