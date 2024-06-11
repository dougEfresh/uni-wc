import { zoraSepolia as vzoraSepolia } from "viem/chains";
import {type Chain} from "../chain";


export const zoraSepolia: Chain = {
	id: "eip155:" + vzoraSepolia.id,
	namespace: "eip155",
	vchain: vzoraSepolia,
};
