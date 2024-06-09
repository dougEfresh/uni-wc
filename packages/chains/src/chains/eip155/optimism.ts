import { optimism as voptimism } from "viem/chains";
import {Chain} from "../chain";


export const optimism: Chain = {
	id: "eip155:" + voptimism.id,
	namespace: "eip155",
	vchain: voptimism,
};
