import { rolluxTestnet as vrolluxTestnet } from "viem/chains";
import {Chain} from "../chain";


export const rolluxTestnet: Chain = {
	id: "eip155:" + vrolluxTestnet.id,
	namespace: "eip155",
	vchain: vrolluxTestnet,
};
