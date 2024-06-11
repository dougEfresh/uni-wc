import { confluxESpace as vconfluxESpace } from "viem/chains";
import {type Chain} from "../chain";


export const confluxESpace: Chain = {
	id: "eip155:" + vconfluxESpace.id,
	namespace: "eip155",
	vchain: vconfluxESpace,
};
