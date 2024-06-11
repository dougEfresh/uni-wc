import { metisGoerli as vmetisGoerli } from "viem/chains";
import {type Chain} from "../chain";


export const metisGoerli: Chain = {
	id: "eip155:" + vmetisGoerli.id,
	namespace: "eip155",
	vchain: vmetisGoerli,
};
