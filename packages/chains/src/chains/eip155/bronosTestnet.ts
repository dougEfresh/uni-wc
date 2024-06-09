import { bronosTestnet as vbronosTestnet } from "viem/chains";
import {Chain} from "../chain";


export const bronosTestnet: Chain = {
	id: "eip155:" + vbronosTestnet.id,
	namespace: "eip155",
	vchain: vbronosTestnet,
};
