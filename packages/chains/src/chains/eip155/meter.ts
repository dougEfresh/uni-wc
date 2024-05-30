import { meter as vmeter } from "viem/chains";
import {Chain} from "../chain.js";


export const meter: Chain = {
	id: "eip155:" + vmeter.id,
	namespace: "eip155",
	vchain: vmeter,
};
