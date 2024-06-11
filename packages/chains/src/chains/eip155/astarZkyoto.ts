import { astarZkyoto as vastarZkyoto } from "viem/chains";
import {type Chain} from "../chain";


export const astarZkyoto: Chain = {
	id: "eip155:" + vastarZkyoto.id,
	namespace: "eip155",
	vchain: vastarZkyoto,
};
