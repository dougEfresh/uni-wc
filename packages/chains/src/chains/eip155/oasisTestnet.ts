import { oasisTestnet as voasisTestnet } from "viem/chains";
import {Chain} from "../chain";


export const oasisTestnet: Chain = {
	id: "eip155:" + voasisTestnet.id,
	namespace: "eip155",
	vchain: voasisTestnet,
};
