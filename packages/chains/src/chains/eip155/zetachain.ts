import { zetachain as vzetachain } from "viem/chains";
import {Chain} from "../chain.js";


export const zetachain: Chain = {
	id: "eip155:" + vzetachain.id,
	namespace: "eip155",
	vchain: vzetachain,
};
