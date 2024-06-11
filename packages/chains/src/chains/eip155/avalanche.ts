import { avalanche as vavalanche } from "viem/chains";
import {type Chain} from "../chain";


export const avalanche: Chain = {
	id: "eip155:" + vavalanche.id,
	namespace: "eip155",
	vchain: vavalanche,
};
