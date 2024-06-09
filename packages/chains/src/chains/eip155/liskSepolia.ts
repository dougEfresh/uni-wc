import { liskSepolia as vliskSepolia } from "viem/chains";
import {Chain} from "../chain";


export const liskSepolia: Chain = {
	id: "eip155:" + vliskSepolia.id,
	namespace: "eip155",
	vchain: vliskSepolia,
};
