import { lightlinkPhoenix as vlightlinkPhoenix } from "viem/chains";
import {type Chain} from "../chain";


export const lightlinkPhoenix: Chain = {
	id: "eip155:" + vlightlinkPhoenix.id,
	namespace: "eip155",
	vchain: vlightlinkPhoenix,
};
