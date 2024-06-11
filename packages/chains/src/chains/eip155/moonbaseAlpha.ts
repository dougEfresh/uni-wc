import { moonbaseAlpha as vmoonbaseAlpha } from "viem/chains";
import {type Chain} from "../chain";


export const moonbaseAlpha: Chain = {
	id: "eip155:" + vmoonbaseAlpha.id,
	namespace: "eip155",
	vchain: vmoonbaseAlpha,
};
