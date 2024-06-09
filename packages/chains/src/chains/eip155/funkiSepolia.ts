import { funkiSepolia as vfunkiSepolia } from "viem/chains";
import {Chain} from "../chain";


export const funkiSepolia: Chain = {
	id: "eip155:" + vfunkiSepolia.id,
	namespace: "eip155",
	vchain: vfunkiSepolia,
};
