import { iotex as viotex } from "viem/chains";
import {Chain} from "../chain.js";


export const iotex: Chain = {
	id: "eip155:" + viotex.id,
	namespace: "eip155",
	vchain: viotex,
};
