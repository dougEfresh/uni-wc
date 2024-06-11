import { manta as vmanta } from "viem/chains";
import {type Chain} from "../chain";


export const manta: Chain = {
	id: "eip155:" + vmanta.id,
	namespace: "eip155",
	vchain: vmanta,
};
