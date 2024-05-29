import { mainnet as veth } from "viem/chains";
import {Chain} from "./chain.js";


export const eth: Chain = {
	id: "eip155:" + veth.id,
	namespace: "eip155",
	vchain: veth,
};
