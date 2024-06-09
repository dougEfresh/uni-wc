import { fantom as vfantom } from "viem/chains";
import {Chain} from "../chain";


export const fantom: Chain = {
	id: "eip155:" + vfantom.id,
	namespace: "eip155",
	vchain: vfantom,
};
