import { gnosis as vgnosis } from "viem/chains";
import {Chain} from "../chain.js";


export const gnosis: Chain = {
	id: "eip155:" + vgnosis.id,
	namespace: "eip155",
	vchain: vgnosis,
};
