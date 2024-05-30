import { nexi as vnexi } from "viem/chains";
import {Chain} from "../chain.js";


export const nexi: Chain = {
	id: "eip155:" + vnexi.id,
	namespace: "eip155",
	vchain: vnexi,
};
