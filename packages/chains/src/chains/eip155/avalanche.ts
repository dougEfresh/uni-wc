import { avalanche as vavalanche } from "viem/chains";
import {Chain} from "../chain.js";


export const avalanche: Chain = {
	id: "eip155:" + vavalanche.id,
	namespace: "eip155",
	vchain: vavalanche,
};
