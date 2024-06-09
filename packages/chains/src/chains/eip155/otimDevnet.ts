import { otimDevnet as votimDevnet } from "viem/chains";
import {Chain} from "../chain";


export const otimDevnet: Chain = {
	id: "eip155:" + votimDevnet.id,
	namespace: "eip155",
	vchain: votimDevnet,
};
