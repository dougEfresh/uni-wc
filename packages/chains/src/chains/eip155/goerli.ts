import { goerli as vgoerli } from "viem/chains";
import {Chain} from "../chain.js";


export const goerli: Chain = {
	id: "eip155:" + vgoerli.id,
	namespace: "eip155",
	vchain: vgoerli,
};
