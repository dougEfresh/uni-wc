import { haqqTestedge2 as vhaqqTestedge2 } from "viem/chains";
import {Chain} from "../chain";


export const haqqTestedge2: Chain = {
	id: "eip155:" + vhaqqTestedge2.id,
	namespace: "eip155",
	vchain: vhaqqTestedge2,
};
