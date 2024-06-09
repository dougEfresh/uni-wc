import { taraxa as vtaraxa } from "viem/chains";
import {Chain} from "../chain";


export const taraxa: Chain = {
	id: "eip155:" + vtaraxa.id,
	namespace: "eip155",
	vchain: vtaraxa,
};
