import { linea as vlinea } from "viem/chains";
import {Chain} from "../chain";


export const linea: Chain = {
	id: "eip155:" + vlinea.id,
	namespace: "eip155",
	vchain: vlinea,
};
