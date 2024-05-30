import { astarZkEVM as vastarZkEVM } from "viem/chains";
import {Chain} from "../chain.js";


export const astarZkEVM: Chain = {
	id: "eip155:" + vastarZkEVM.id,
	namespace: "eip155",
	vchain: vastarZkEVM,
};
