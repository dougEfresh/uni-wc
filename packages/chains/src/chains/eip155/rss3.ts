import { rss3 as vrss3 } from "viem/chains";
import {type Chain} from "../chain";


export const rss3: Chain = {
	id: "eip155:" + vrss3.id,
	namespace: "eip155",
	vchain: vrss3,
};
