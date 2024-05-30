import { astarZkyoto as vastarZkyoto } from "viem/chains";
import {Chain} from "../chain.js";


export const astarZkyoto: Chain = {
	id: "eip155:" + vastarZkyoto.id,
	namespace: "eip155",
	vchain: vastarZkyoto,
};
