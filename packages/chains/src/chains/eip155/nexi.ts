import { nexi as vnexi } from "viem/chains";
import {type Chain} from "../chain";


export const nexi: Chain = {
	id: "eip155:" + vnexi.id,
	namespace: "eip155",
	vchain: vnexi,
};
