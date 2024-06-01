import { etherlinkTestnet as vetherlinkTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const etherlinkTestnet: Chain = {
	id: "eip155:" + vetherlinkTestnet.id,
	namespace: "eip155",
	vchain: vetherlinkTestnet,
};