import { wemix as vwemix } from "viem/chains";
import {type Chain} from "../chain";


export const wemix: Chain = {
	id: "eip155:" + vwemix.id,
	namespace: "eip155",
	vchain: vwemix,
};
