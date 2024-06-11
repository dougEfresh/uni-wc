import { lineaGoerli as vlineaGoerli } from "viem/chains";
import {type Chain} from "../chain";


export const lineaGoerli: Chain = {
	id: "eip155:" + vlineaGoerli.id,
	namespace: "eip155",
	vchain: vlineaGoerli,
};
