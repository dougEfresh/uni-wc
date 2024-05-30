import { syscoin as vsyscoin } from "viem/chains";
import {Chain} from "../chain.js";


export const syscoin: Chain = {
	id: "eip155:" + vsyscoin.id,
	namespace: "eip155",
	vchain: vsyscoin,
};
