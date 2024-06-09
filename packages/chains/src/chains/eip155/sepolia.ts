import { sepolia as vsepolia } from "viem/chains";
import {Chain} from "../chain";


export const sepolia: Chain = {
	id: "eip155:" + vsepolia.id,
	namespace: "eip155",
	vchain: vsepolia,
};

