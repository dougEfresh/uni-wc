import { moonbeam as vmoonbeam } from "viem/chains";
import {Chain} from "../chain.js";


export const moonbeam: Chain = {
	id: "eip155:" + vmoonbeam.id,
	namespace: "eip155",
	vchain: vmoonbeam,
};