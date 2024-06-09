import { auroraTestnet as vauroraTestnet } from "viem/chains";
import {Chain} from "../chain";


export const auroraTestnet: Chain = {
	id: "eip155:" + vauroraTestnet.id,
	namespace: "eip155",
	vchain: vauroraTestnet,
};
