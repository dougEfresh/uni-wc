import { degen as vdegen } from "viem/chains";
import {Chain} from "../chain";


export const degen: Chain = {
	id: "eip155:" + vdegen.id,
	namespace: "eip155",
	vchain: vdegen,
};
