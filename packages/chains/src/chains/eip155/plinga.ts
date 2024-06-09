import { plinga as vplinga } from "viem/chains";
import {Chain} from "../chain";


export const plinga: Chain = {
	id: "eip155:" + vplinga.id,
	namespace: "eip155",
	vchain: vplinga,
};
