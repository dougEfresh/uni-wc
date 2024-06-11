import { kromaSepolia as vkromaSepolia } from "viem/chains";
import {type Chain} from "../chain";


export const kromaSepolia: Chain = {
	id: "eip155:" + vkromaSepolia.id,
	namespace: "eip155",
	vchain: vkromaSepolia,
};
