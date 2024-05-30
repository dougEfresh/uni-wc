import { inEVM as vinEVM } from "viem/chains";
import {Chain} from "../chain.js";


export const inEVM: Chain = {
	id: "eip155:" + vinEVM.id,
	namespace: "eip155",
	vchain: vinEVM,
};
