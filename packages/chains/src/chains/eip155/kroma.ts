import { kroma as vkroma } from "viem/chains";
import {type Chain} from "../chain";


export const kroma: Chain = {
	id: "eip155:" + vkroma.id,
	namespace: "eip155",
	vchain: vkroma,
};
