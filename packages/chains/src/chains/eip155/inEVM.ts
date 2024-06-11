import { inEVM as vinEVM } from "viem/chains";
import {type Chain} from "../chain";


export const inEVM: Chain = {
	id: "eip155:" + vinEVM.id,
	namespace: "eip155",
	vchain: vinEVM,
};
