import { avalancheFuji as vavalancheFuji } from "viem/chains";
import {type Chain} from "../chain";


export const avalancheFuji: Chain = {
	id: "eip155:" + vavalancheFuji.id,
	namespace: "eip155",
	vchain: vavalancheFuji,
};
