import { syscoin as vsyscoin } from "viem/chains";
import {type Chain} from "../chain";


export const syscoin: Chain = {
	id: "eip155:" + vsyscoin.id,
	namespace: "eip155",
	vchain: vsyscoin,
};
