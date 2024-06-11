import { arbitrumNova as varbitrumNova } from "viem/chains";
import {type Chain} from "../chain";


export const arbitrumNova: Chain = {
	id: "eip155:" + varbitrumNova.id,
	namespace: "eip155",
	vchain: varbitrumNova,
};
