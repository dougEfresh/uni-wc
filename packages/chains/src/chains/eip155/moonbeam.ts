import { moonbeam as vmoonbeam } from "viem/chains";
import {type Chain} from "../chain";


export const moonbeam: Chain = {
	id: "eip155:" + vmoonbeam.id,
	namespace: "eip155",
	vchain: vmoonbeam,
};
