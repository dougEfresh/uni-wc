import { astarZkEVM as vastarZkEVM } from "viem/chains";
import {type Chain} from "../chain";


export const astarZkEVM: Chain = {
	id: "eip155:" + vastarZkEVM.id,
	namespace: "eip155",
	vchain: vastarZkEVM,
};
