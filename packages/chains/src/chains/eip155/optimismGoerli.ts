import { optimismGoerli as voptimismGoerli } from "viem/chains";
import {Chain} from "../chain.js";


export const optimismGoerli: Chain = {
	id: "eip155:" + voptimismGoerli.id,
	namespace: "eip155",
	vchain: voptimismGoerli,
};
