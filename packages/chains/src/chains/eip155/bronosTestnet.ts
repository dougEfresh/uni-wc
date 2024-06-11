import { bronosTestnet as vbronosTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const bronosTestnet: Chain = {
	id: "eip155:" + vbronosTestnet.id,
	namespace: "eip155",
	vchain: vbronosTestnet,
};
