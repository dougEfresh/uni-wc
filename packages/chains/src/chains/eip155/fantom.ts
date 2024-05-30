import { fantom as vfantom } from "viem/chains";
import {Chain} from "../chain.js";


export const fantom: Chain = {
	id: "eip155:" + vfantom.id,
	namespace: "eip155",
	vchain: vfantom,
};
