import { cyber as vcyber } from "viem/chains";
import {type Chain} from "../chain";


export const cyber: Chain = {
	id: "eip155:" + vcyber.id,
	namespace: "eip155",
	vchain: vcyber,
};
