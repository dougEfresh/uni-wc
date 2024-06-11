import { vechain as vvechain } from "viem/chains";
import {type Chain} from "../chain";


export const vechain: Chain = {
	id: "eip155:" + vvechain.id,
	namespace: "eip155",
	vchain: vvechain,
};
