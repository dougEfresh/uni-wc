import { telos as vtelos } from "viem/chains";
import {Chain} from "../chain.js";


export const telos: Chain = {
	id: "eip155:" + vtelos.id,
	namespace: "eip155",
	vchain: vtelos,
};
