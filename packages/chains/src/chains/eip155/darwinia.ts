import { darwinia as vdarwinia } from "viem/chains";
import {type Chain} from "../chain";


export const darwinia: Chain = {
	id: "eip155:" + vdarwinia.id,
	namespace: "eip155",
	vchain: vdarwinia,
};
