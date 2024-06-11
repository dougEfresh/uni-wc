import { edgeless as vedgeless } from "viem/chains";
import {type Chain} from "../chain";


export const edgeless: Chain = {
	id: "eip155:" + vedgeless.id,
	namespace: "eip155",
	vchain: vedgeless,
};
