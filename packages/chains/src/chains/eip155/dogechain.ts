import { dogechain as vdogechain } from "viem/chains";
import {Chain} from "../chain.js";


export const dogechain: Chain = {
	id: "eip155:" + vdogechain.id,
	namespace: "eip155",
	vchain: vdogechain,
};
