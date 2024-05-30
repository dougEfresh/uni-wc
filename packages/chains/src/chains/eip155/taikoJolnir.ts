import { taikoJolnir as vtaikoJolnir } from "viem/chains";
import {Chain} from "../chain.js";


export const taikoJolnir: Chain = {
	id: "eip155:" + vtaikoJolnir.id,
	namespace: "eip155",
	vchain: vtaikoJolnir,
};
