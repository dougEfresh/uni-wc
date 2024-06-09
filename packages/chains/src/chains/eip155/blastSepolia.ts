import { blastSepolia as vblastSepolia } from "viem/chains";
import {Chain} from "../chain";


export const blastSepolia: Chain = {
	id: "eip155:" + vblastSepolia.id,
	namespace: "eip155",
	vchain: vblastSepolia,
};
