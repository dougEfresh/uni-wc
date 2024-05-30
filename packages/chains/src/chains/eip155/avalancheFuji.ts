import { avalancheFuji as vavalancheFuji } from "viem/chains";
import {Chain} from "../chain.js";


export const avalancheFuji: Chain = {
	id: "eip155:" + vavalancheFuji.id,
	namespace: "eip155",
	vchain: vavalancheFuji,
};
