import { areonNetwork as vareonNetwork } from "viem/chains";
import {Chain} from "../chain";


export const areonNetwork: Chain = {
	id: "eip155:" + vareonNetwork.id,
	namespace: "eip155",
	vchain: vareonNetwork,
};
