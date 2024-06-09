import { baseGoerli as vbaseGoerli } from "viem/chains";
import {Chain} from "../chain";


export const baseGoerli: Chain = {
	id: "eip155:" + vbaseGoerli.id,
	namespace: "eip155",
	vchain: vbaseGoerli,
};
