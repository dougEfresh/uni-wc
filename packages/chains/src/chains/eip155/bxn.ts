import { bxn as vbxn } from "viem/chains";
import {Chain} from "../chain";


export const bxn: Chain = {
	id: "eip155:" + vbxn.id,
	namespace: "eip155",
	vchain: vbxn,
};
