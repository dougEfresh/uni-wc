import { filecoin as vfilecoin } from "viem/chains";
import {type Chain} from "../chain";


export const filecoin: Chain = {
	id: "eip155:" + vfilecoin.id,
	namespace: "eip155",
	vchain: vfilecoin,
};
