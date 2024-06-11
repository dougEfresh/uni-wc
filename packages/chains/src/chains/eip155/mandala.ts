import { mandala as vmandala } from "viem/chains";
import {type Chain} from "../chain";


export const mandala: Chain = {
	id: "eip155:" + vmandala.id,
	namespace: "eip155",
	vchain: vmandala,
};
