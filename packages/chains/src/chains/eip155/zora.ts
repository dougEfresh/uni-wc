import { zora as vzora } from "viem/chains";
import {type Chain} from "../chain";


export const zora: Chain = {
	id: "eip155:" + vzora.id,
	namespace: "eip155",
	vchain: vzora,
};
