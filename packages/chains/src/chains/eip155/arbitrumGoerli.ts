import { arbitrumGoerli as varbitrumGoerli } from "viem/chains";
import {type Chain} from "../chain";


export const arbitrumGoerli: Chain = {
	id: "eip155:" + varbitrumGoerli.id,
	namespace: "eip155",
	vchain: varbitrumGoerli,
};
