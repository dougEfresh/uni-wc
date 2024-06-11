import { baseSepolia as vbaseSepolia } from "viem/chains";
import {type Chain} from "../chain";


export const baseSepolia: Chain = {
	id: "eip155:" + vbaseSepolia.id,
	namespace: "eip155",
	vchain: vbaseSepolia,
};
