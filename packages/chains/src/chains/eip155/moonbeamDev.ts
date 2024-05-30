import { moonbeamDev as vmoonbeamDev } from "viem/chains";
import {Chain} from "../chain.js";


export const moonbeamDev: Chain = {
	id: "eip155:" + vmoonbeamDev.id,
	namespace: "eip155",
	vchain: vmoonbeamDev,
};
