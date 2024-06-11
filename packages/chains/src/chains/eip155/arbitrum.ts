import { arbitrum as varbitrum } from "viem/chains";
import {type Chain} from "../chain";


export const arbitrum: Chain = {
	id: "eip155:" + varbitrum.id,
	namespace: "eip155",
	vchain: varbitrum,
};
