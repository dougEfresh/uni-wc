import { moonbaseAlpha as vmoonbaseAlpha } from "viem/chains";
import {Chain} from "../chain";


export const moonbaseAlpha: Chain = {
	id: "eip155:" + vmoonbaseAlpha.id,
	namespace: "eip155",
	vchain: vmoonbaseAlpha,
};
