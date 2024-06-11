import { saigon as vsaigon } from "viem/chains";
import {type Chain} from "../chain";


export const saigon: Chain = {
	id: "eip155:" + vsaigon.id,
	namespace: "eip155",
	vchain: vsaigon,
};
