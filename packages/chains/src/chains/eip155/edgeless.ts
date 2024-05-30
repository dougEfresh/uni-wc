import { edgeless as vedgeless } from "viem/chains";
import {Chain} from "../chain.js";


export const edgeless: Chain = {
	id: "eip155:" + vedgeless.id,
	namespace: "eip155",
	vchain: vedgeless,
};
