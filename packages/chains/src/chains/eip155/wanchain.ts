import { wanchain as vwanchain } from "viem/chains";
import {Chain} from "../chain.js";


export const wanchain: Chain = {
	id: "eip155:" + vwanchain.id,
	namespace: "eip155",
	vchain: vwanchain,
};
