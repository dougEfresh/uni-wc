import { bob as vbob } from "viem/chains";
import {Chain} from "../chain";


export const bob: Chain = {
	id: "eip155:" + vbob.id,
	namespace: "eip155",
	vchain: vbob,
};
