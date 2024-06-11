import { kava as vkava } from "viem/chains";
import {type Chain} from "../chain";


export const kava: Chain = {
	id: "eip155:" + vkava.id,
	namespace: "eip155",
	vchain: vkava,
};
