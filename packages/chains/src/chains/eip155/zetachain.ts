import { zetachain as vzetachain } from "viem/chains";
import {type Chain} from "../chain";


export const zetachain: Chain = {
	id: "eip155:" + vzetachain.id,
	namespace: "eip155",
	vchain: vzetachain,
};
