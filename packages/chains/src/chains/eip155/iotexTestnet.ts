import { iotexTestnet as viotexTestnet } from "viem/chains";
import {Chain} from "../chain";


export const iotexTestnet: Chain = {
	id: "eip155:" + viotexTestnet.id,
	namespace: "eip155",
	vchain: viotexTestnet,
};
