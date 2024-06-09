import { oasys as voasys } from "viem/chains";
import {Chain} from "../chain";


export const oasys: Chain = {
	id: "eip155:" + voasys.id,
	namespace: "eip155",
	vchain: voasys,
};
