import { seiDevnet as vseiDevnet } from "viem/chains";
import {Chain} from "../chain.js";


export const seiDevnet: Chain = {
	id: "eip155:" + vseiDevnet.id,
	namespace: "eip155",
	vchain: vseiDevnet,
};
