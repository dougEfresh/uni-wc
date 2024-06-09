import { telos as vtelos } from "viem/chains";
import {Chain} from "../chain";


export const telos: Chain = {
	id: "eip155:" + vtelos.id,
	namespace: "eip155",
	vchain: vtelos,
};
