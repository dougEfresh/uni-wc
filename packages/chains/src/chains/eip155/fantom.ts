import { fantom as vfantom } from "viem/chains";
import {type Chain} from "../chain";


export const fantom: Chain = {
	id: "eip155:" + vfantom.id,
	namespace: "eip155",
	vchain: vfantom,
};
