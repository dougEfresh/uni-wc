import { holesky as vholesky } from "viem/chains";
import {Chain} from "../chain.js";


export const holesky: Chain = {
	id: "eip155:" + vholesky.id,
	namespace: "eip155",
	vchain: vholesky,
};
