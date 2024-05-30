import { tenet as vtenet } from "viem/chains";
import {Chain} from "../chain.js";


export const tenet: Chain = {
	id: "eip155:" + vtenet.id,
	namespace: "eip155",
	vchain: vtenet,
};
