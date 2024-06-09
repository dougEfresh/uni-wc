import { songbirdTestnet as vsongbirdTestnet } from "viem/chains";
import {Chain} from "../chain";


export const songbirdTestnet: Chain = {
	id: "eip155:" + vsongbirdTestnet.id,
	namespace: "eip155",
	vchain: vsongbirdTestnet,
};
