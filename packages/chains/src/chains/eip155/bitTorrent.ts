import { bitTorrent as vbitTorrent } from "viem/chains";
import {Chain} from "../chain";


export const bitTorrent: Chain = {
	id: "eip155:" + vbitTorrent.id,
	namespace: "eip155",
	vchain: vbitTorrent,
};
