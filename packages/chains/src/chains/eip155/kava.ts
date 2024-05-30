import { kava as vkava } from "viem/chains";
import {Chain} from "../chain.js";


export const kava: Chain = {
	id: "eip155:" + vkava.id,
	namespace: "eip155",
	vchain: vkava,
};
