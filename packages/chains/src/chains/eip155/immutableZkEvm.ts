import { immutableZkEvm as vimmutableZkEvm } from "viem/chains";
import {Chain} from "../chain";


export const immutableZkEvm: Chain = {
	id: "eip155:" + vimmutableZkEvm.id,
	namespace: "eip155",
	vchain: vimmutableZkEvm,
};
