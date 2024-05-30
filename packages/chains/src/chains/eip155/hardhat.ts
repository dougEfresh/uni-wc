import { hardhat as vhardhat } from "viem/chains";
import {Chain} from "../chain.js";


export const hardhat: Chain = {
	id: "eip155:" + vhardhat.id,
	namespace: "eip155",
	vchain: vhardhat,
};
