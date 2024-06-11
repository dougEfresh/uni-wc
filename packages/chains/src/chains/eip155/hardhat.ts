import { hardhat as vhardhat } from "viem/chains";
import {type Chain} from "../chain";


export const hardhat: Chain = {
	id: "eip155:" + vhardhat.id,
	namespace: "eip155",
	vchain: vhardhat,
};
