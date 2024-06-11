import { optimismGoerli as voptimismGoerli } from "viem/chains";
import {type Chain} from "../chain";


export const optimismGoerli: Chain = {
	id: "eip155:" + voptimismGoerli.id,
	namespace: "eip155",
	vchain: voptimismGoerli,
};
