import { anvil as vanvil } from "viem/chains";
import {Chain} from "../chain.js";


export const anvil: Chain = {
	id: "eip155:" + vanvil.id,
	namespace: "eip155",
	vchain: vanvil,
};
