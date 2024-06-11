import { wanchain as vwanchain } from "viem/chains";
import {type Chain} from "../chain";


export const wanchain: Chain = {
	id: "eip155:" + vwanchain.id,
	namespace: "eip155",
	vchain: vwanchain,
};
