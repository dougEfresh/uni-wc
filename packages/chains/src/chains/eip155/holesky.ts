import { holesky as vholesky } from "viem/chains";
import {type Chain} from "../chain";


export const holesky: Chain = {
	id: "eip155:" + vholesky.id,
	namespace: "eip155",
	vchain: vholesky,
};
