import { filecoin as vfilecoin } from "viem/chains";
import {Chain} from "../chain.js";


export const filecoin: Chain = {
	id: "eip155:" + vfilecoin.id,
	namespace: "eip155",
	vchain: vfilecoin,
};
