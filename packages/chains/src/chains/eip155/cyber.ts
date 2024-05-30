import { cyber as vcyber } from "viem/chains";
import {Chain} from "../chain.js";


export const cyber: Chain = {
	id: "eip155:" + vcyber.id,
	namespace: "eip155",
	vchain: vcyber,
};
