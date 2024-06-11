import { bevmMainnet as vbevmMainnet } from "viem/chains";
import {type Chain} from "../chain";


export const bevmMainnet: Chain = {
	id: "eip155:" + vbevmMainnet.id,
	namespace: "eip155",
	vchain: vbevmMainnet,
};
