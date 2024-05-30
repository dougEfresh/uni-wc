import { aurora as vaurora } from "viem/chains";
import {Chain} from "../chain.js";


export const aurora: Chain = {
	id: "eip155:" + vaurora.id,
	namespace: "eip155",
	vchain: vaurora,
};
