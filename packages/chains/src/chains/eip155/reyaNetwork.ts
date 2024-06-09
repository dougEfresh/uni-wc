import { reyaNetwork as vreyaNetwork } from "viem/chains";
import {Chain} from "../chain";


export const reyaNetwork: Chain = {
	id: "eip155:" + vreyaNetwork.id,
	namespace: "eip155",
	vchain: vreyaNetwork,
};
