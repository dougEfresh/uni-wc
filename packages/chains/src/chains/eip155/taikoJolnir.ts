import { taikoJolnir as vtaikoJolnir } from "viem/chains";
import {type Chain} from "../chain";


export const taikoJolnir: Chain = {
	id: "eip155:" + vtaikoJolnir.id,
	namespace: "eip155",
	vchain: vtaikoJolnir,
};
