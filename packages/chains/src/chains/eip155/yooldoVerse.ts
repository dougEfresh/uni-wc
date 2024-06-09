import { yooldoVerse as vyooldoVerse } from "viem/chains";
import {Chain} from "../chain";


export const yooldoVerse: Chain = {
	id: "eip155:" + vyooldoVerse.id,
	namespace: "eip155",
	vchain: vyooldoVerse,
};
