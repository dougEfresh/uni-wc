import { gnosis as vgnosis } from "viem/chains";
import {Chain} from "../chain";


export const gnosis: Chain = {
	id: "eip155:" + vgnosis.id,
	namespace: "eip155",
	vchain: vgnosis,
};
