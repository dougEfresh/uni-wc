import { darwinia as vdarwinia } from "viem/chains";
import {Chain} from "../chain.js";


export const darwinia: Chain = {
	id: "eip155:" + vdarwinia.id,
	namespace: "eip155",
	vchain: vdarwinia,
};
