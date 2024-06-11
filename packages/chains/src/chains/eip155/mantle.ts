import { mantle as vmantle } from "viem/chains";
import {type Chain} from "../chain";


export const mantle: Chain = {
	id: "eip155:" + vmantle.id,
	namespace: "eip155",
	vchain: vmantle,
};
