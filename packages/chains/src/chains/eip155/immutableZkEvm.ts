import { immutableZkEvm as vimmutableZkEvm } from "viem/chains";
import {type Chain} from "../chain";


export const immutableZkEvm: Chain = {
	id: "eip155:" + vimmutableZkEvm.id,
	namespace: "eip155",
	vchain: vimmutableZkEvm,
};
