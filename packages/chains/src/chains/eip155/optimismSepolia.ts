import { optimismSepolia as voptimismSepolia } from "viem/chains";
import {type Chain} from "../chain";


export const optimismSepolia: Chain = {
	id: "eip155:" + voptimismSepolia.id,
	namespace: "eip155",
	vchain: voptimismSepolia,
};
