import { celo as vcelo } from "viem/chains";
import {type Chain} from "../chain";


export const celo: Chain = {
	id: "eip155:" + vcelo.id,
	namespace: "eip155",
	vchain: vcelo,
};
