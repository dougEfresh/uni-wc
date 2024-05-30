import { blastSepolia as vblastSepolia } from "viem/chains";
import {Chain} from "../chain.js";


export const blastSepolia: Chain = {
	id: "eip155:" + vblastSepolia.id,
	namespace: "eip155",
	vchain: vblastSepolia,
};
