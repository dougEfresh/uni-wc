import { neonMainnet as vneonMainnet } from "viem/chains";
import {type Chain} from "../chain";


export const neonMainnet: Chain = {
	id: "eip155:" + vneonMainnet.id,
	namespace: "eip155",
	vchain: vneonMainnet,
};
