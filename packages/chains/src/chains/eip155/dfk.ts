import { dfk as vdfk } from "viem/chains";
import {Chain} from "../chain.js";


export const dfk: Chain = {
	id: "eip155:" + vdfk.id,
	namespace: "eip155",
	vchain: vdfk,
};
