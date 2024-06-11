import { ronin as vronin } from "viem/chains";
import {type Chain} from "../chain";


export const ronin: Chain = {
	id: "eip155:" + vronin.id,
	namespace: "eip155",
	vchain: vronin,
};
