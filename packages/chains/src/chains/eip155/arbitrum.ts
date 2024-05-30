import { arbitrum as varbitrum } from "viem/chains";
import {Chain} from "../chain.js";


export const arbitrum: Chain = {
	id: "eip155:" + varbitrum.id,
	namespace: "eip155",
	vchain: varbitrum,
};
