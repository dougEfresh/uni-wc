import { zoraSepolia as vzoraSepolia } from "viem/chains";
import {Chain} from "../chain.js";


export const zoraSepolia: Chain = {
	id: "eip155:" + vzoraSepolia.id,
	namespace: "eip155",
	vchain: vzoraSepolia,
};