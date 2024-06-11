import { lightlinkPegasus as vlightlinkPegasus } from "viem/chains";
import {type Chain} from "../chain";


export const lightlinkPegasus: Chain = {
	id: "eip155:" + vlightlinkPegasus.id,
	namespace: "eip155",
	vchain: vlightlinkPegasus,
};
