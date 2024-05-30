import { metisGoerli as vmetisGoerli } from "viem/chains";
import {Chain} from "../chain.js";


export const metisGoerli: Chain = {
	id: "eip155:" + vmetisGoerli.id,
	namespace: "eip155",
	vchain: vmetisGoerli,
};
