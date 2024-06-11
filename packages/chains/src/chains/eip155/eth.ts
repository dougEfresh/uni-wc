import { mainnet as veth } from "viem/chains";
import {type Chain} from "../chain";


export const eth: Chain = {
	id: "eip155:" + veth.id,
	namespace: "eip155",
	vchain: veth,
};
