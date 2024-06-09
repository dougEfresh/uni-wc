import { lineaGoerli as vlineaGoerli } from "viem/chains";
import {Chain} from "../chain";


export const lineaGoerli: Chain = {
	id: "eip155:" + vlineaGoerli.id,
	namespace: "eip155",
	vchain: vlineaGoerli,
};
