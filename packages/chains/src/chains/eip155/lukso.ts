import { lukso as vlukso } from "viem/chains";
import {Chain} from "../chain";


export const lukso: Chain = {
	id: "eip155:" + vlukso.id,
	namespace: "eip155",
	vchain: vlukso,
};
