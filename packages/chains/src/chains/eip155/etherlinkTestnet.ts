import { etherlinkTestnet as vetherlinkTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const etherlinkTestnet: Chain = {
	id: "eip155:" + vetherlinkTestnet.id,
	namespace: "eip155",
	vchain: vetherlinkTestnet,
};
