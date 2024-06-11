import { metachain as vmetachain } from "viem/chains";
import {type Chain} from "../chain";


export const metachain: Chain = {
	id: "eip155:" + vmetachain.id,
	namespace: "eip155",
	vchain: vmetachain,
};
