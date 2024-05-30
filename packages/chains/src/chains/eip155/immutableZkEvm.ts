import { immutableZkEvm as vimmutableZkEvm } from "viem/chains";
import {Chain} from "../chain.js";


export const immutableZkEvm: Chain = {
	id: "eip155:" + vimmutableZkEvm.id,
	namespace: "eip155",
	vchain: vimmutableZkEvm,
};
