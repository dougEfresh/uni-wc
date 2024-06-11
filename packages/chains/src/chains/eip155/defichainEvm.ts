import { defichainEvm as vdefichainEvm } from "viem/chains";
import {type Chain} from "../chain";


export const defichainEvm: Chain = {
	id: "eip155:" + vdefichainEvm.id,
	namespace: "eip155",
	vchain: vdefichainEvm,
};
