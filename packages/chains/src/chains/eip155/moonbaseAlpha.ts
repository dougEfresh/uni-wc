import { moonbaseAlpha as vmoonbaseAlpha } from "viem/chains";
import {Chain} from "../chain.js";


export const moonbaseAlpha: Chain = {
	id: "eip155:" + vmoonbaseAlpha.id,
	namespace: "eip155",
	vchain: vmoonbaseAlpha,
};
