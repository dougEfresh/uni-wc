import { moonbeamDev as vmoonbeamDev } from "viem/chains";
import {type Chain} from "../chain";


export const moonbeamDev: Chain = {
	id: "eip155:" + vmoonbeamDev.id,
	namespace: "eip155",
	vchain: vmoonbeamDev,
};
