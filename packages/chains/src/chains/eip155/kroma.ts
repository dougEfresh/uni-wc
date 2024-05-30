import { kroma as vkroma } from "viem/chains";
import {Chain} from "../chain.js";


export const kroma: Chain = {
	id: "eip155:" + vkroma.id,
	namespace: "eip155",
	vchain: vkroma,
};
