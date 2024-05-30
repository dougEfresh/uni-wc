import { localhost as vlocalhost } from "viem/chains";
import {Chain} from "../chain.js";


export const localhost: Chain = {
	id: "eip155:" + vlocalhost.id,
	namespace: "eip155",
	vchain: vlocalhost,
};
