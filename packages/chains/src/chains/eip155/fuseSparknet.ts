import { fuseSparknet as vfuseSparknet } from "viem/chains";
import {Chain} from "../chain.js";


export const fuseSparknet: Chain = {
	id: "eip155:" + vfuseSparknet.id,
	namespace: "eip155",
	vchain: vfuseSparknet,
};
