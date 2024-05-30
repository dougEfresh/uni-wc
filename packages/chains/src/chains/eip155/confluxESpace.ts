import { confluxESpace as vconfluxESpace } from "viem/chains";
import {Chain} from "../chain.js";


export const confluxESpace: Chain = {
	id: "eip155:" + vconfluxESpace.id,
	namespace: "eip155",
	vchain: vconfluxESpace,
};
