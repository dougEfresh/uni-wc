import { mandala as vmandala } from "viem/chains";
import {Chain} from "../chain.js";


export const mandala: Chain = {
	id: "eip155:" + vmandala.id,
	namespace: "eip155",
	vchain: vmandala,
};
