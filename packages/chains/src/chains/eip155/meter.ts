import { meter as vmeter } from "viem/chains";
import {Chain} from "../chain";


export const meter: Chain = {
	id: "eip155:" + vmeter.id,
	namespace: "eip155",
	vchain: vmeter,
};
