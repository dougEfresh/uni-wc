import { kromaSepolia as vkromaSepolia } from "viem/chains";
import {Chain} from "../chain.js";


export const kromaSepolia: Chain = {
	id: "eip155:" + vkromaSepolia.id,
	namespace: "eip155",
	vchain: vkromaSepolia,
};
