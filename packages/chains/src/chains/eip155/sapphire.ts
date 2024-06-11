import { sapphire as vsapphire } from "viem/chains";
import {type Chain} from "../chain";


export const sapphire: Chain = {
	id: "eip155:" + vsapphire.id,
	namespace: "eip155",
	vchain: vsapphire,
};
