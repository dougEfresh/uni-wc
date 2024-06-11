import { edgeware as vedgeware } from "viem/chains";
import {type Chain} from "../chain";


export const edgeware: Chain = {
	id: "eip155:" + vedgeware.id,
	namespace: "eip155",
	vchain: vedgeware,
};
