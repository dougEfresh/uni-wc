import { neonMainnet as vneonMainnet } from "viem/chains";
import {Chain} from "../chain.js";


export const neonMainnet: Chain = {
	id: "eip155:" + vneonMainnet.id,
	namespace: "eip155",
	vchain: vneonMainnet,
};
