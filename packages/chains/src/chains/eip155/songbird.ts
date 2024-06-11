import { songbird as vsongbird } from "viem/chains";
import {type Chain} from "../chain";


export const songbird: Chain = {
	id: "eip155:" + vsongbird.id,
	namespace: "eip155",
	vchain: vsongbird,
};
