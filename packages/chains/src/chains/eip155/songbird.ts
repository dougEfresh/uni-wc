import { songbird as vsongbird } from "viem/chains";
import {Chain} from "../chain.js";


export const songbird: Chain = {
	id: "eip155:" + vsongbird.id,
	namespace: "eip155",
	vchain: vsongbird,
};
