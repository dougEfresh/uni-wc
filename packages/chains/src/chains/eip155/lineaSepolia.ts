import { lineaSepolia as vlineaSepolia } from "viem/chains";
import {Chain} from "../chain";


export const lineaSepolia: Chain = {
	id: "eip155:" + vlineaSepolia.id,
	namespace: "eip155",
	vchain: vlineaSepolia,
};
