import { blast as vblast } from "viem/chains";
import {type Chain} from "../chain";


export const blast: Chain = {
	id: "eip155:" + vblast.id,
	namespace: "eip155",
	vchain: vblast,
};
