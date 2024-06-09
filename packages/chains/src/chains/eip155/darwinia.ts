import { darwinia as vdarwinia } from "viem/chains";
import {Chain} from "../chain";


export const darwinia: Chain = {
	id: "eip155:" + vdarwinia.id,
	namespace: "eip155",
	vchain: vdarwinia,
};
