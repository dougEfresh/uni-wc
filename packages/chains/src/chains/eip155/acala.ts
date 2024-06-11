import { acala as vacala } from "viem/chains";
import {type Chain} from "../chain";


export const acala: Chain = {
	id: "eip155:" + vacala.id,
	namespace: "eip155",
	vchain: vacala,
};
