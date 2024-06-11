import { goerli as vgoerli } from "viem/chains";
import {type Chain} from "../chain";


export const goerli: Chain = {
	id: "eip155:" + vgoerli.id,
	namespace: "eip155",
	vchain: vgoerli,
};
