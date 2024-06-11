import { bitTorrentTestnet as vbitTorrentTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const bitTorrentTestnet: Chain = {
	id: "eip155:" + vbitTorrentTestnet.id,
	namespace: "eip155",
	vchain: vbitTorrentTestnet,
};
