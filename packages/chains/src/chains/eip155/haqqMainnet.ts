import { haqqMainnet as vhaqqMainnet } from "viem/chains";
import {Chain} from "../chain.js";


export const haqqMainnet: Chain = {
	id: "eip155:" + vhaqqMainnet.id,
	namespace: "eip155",
	vchain: vhaqqMainnet,
};
