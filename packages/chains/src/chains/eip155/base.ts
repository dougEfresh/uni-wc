import { base as vbase } from "viem/chains";
import {type Chain} from "../chain";


export const base: Chain = {
	id: "eip155:" + vbase.id,
	namespace: "eip155",
	vchain: vbase,
};
