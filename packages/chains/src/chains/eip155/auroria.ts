import { auroria as vauroria } from "viem/chains";
import {Chain} from "../chain.js";


export const auroria: Chain = {
	id: "eip155:" + vauroria.id,
	namespace: "eip155",
	vchain: vauroria,
};
