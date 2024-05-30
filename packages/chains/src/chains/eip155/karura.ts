import { karura as vkarura } from "viem/chains";
import {Chain} from "../chain.js";


export const karura: Chain = {
	id: "eip155:" + vkarura.id,
	namespace: "eip155",
	vchain: vkarura,
};
