import { neonDevnet as vneonDevnet } from "viem/chains";
import {Chain} from "../chain";


export const neonDevnet: Chain = {
	id: "eip155:" + vneonDevnet.id,
	namespace: "eip155",
	vchain: vneonDevnet,
};
