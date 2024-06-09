import { rootstockTestnet as vrootstockTestnet } from "viem/chains";
import {Chain} from "../chain";


export const rootstockTestnet: Chain = {
	id: "eip155:" + vrootstockTestnet.id,
	namespace: "eip155",
	vchain: vrootstockTestnet,
};
