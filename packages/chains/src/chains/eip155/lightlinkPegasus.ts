import { lightlinkPegasus as vlightlinkPegasus } from "viem/chains";
import {Chain} from "../chain.js";


export const lightlinkPegasus: Chain = {
	id: "eip155:" + vlightlinkPegasus.id,
	namespace: "eip155",
	vchain: vlightlinkPegasus,
};
