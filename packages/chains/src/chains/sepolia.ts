import { sepolia as vsepolia } from "viem/chains";
import {Chain} from "./chain.js";


export const sepolia: Chain = {
	id: "eip155:" + vsepolia.id,
	namespace: "eip155",
	vchain: vsepolia,
};
