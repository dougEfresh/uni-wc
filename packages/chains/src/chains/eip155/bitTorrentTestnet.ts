import { bitTorrentTestnet as vbitTorrentTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const bitTorrentTestnet: Chain = {
	id: "eip155:" + vbitTorrentTestnet.id,
	namespace: "eip155",
	vchain: vbitTorrentTestnet,
};
