import { mantle as vmantle } from "viem/chains";
import {Chain} from "../chain";


export const mantle: Chain = {
	id: "eip155:" + vmantle.id,
	namespace: "eip155",
	vchain: vmantle,
};
