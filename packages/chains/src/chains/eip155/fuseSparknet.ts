import { fuseSparknet as vfuseSparknet } from "viem/chains";
import {type Chain} from "../chain";


export const fuseSparknet: Chain = {
	id: "eip155:" + vfuseSparknet.id,
	namespace: "eip155",
	vchain: vfuseSparknet,
};
