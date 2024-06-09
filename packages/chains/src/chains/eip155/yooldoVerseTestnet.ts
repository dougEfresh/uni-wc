import { yooldoVerseTestnet as vyooldoVerseTestnet } from "viem/chains";
import {Chain} from "../chain";


export const yooldoVerseTestnet: Chain = {
	id: "eip155:" + vyooldoVerseTestnet.id,
	namespace: "eip155",
	vchain: vyooldoVerseTestnet,
};
