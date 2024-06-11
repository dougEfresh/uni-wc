import { auroria as vauroria } from "viem/chains";
import {type Chain} from "../chain";


export const auroria: Chain = {
	id: "eip155:" + vauroria.id,
	namespace: "eip155",
	vchain: vauroria,
};
