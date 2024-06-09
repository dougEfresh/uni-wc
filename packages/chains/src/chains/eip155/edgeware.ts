import { edgeware as vedgeware } from "viem/chains";
import {Chain} from "../chain";


export const edgeware: Chain = {
	id: "eip155:" + vedgeware.id,
	namespace: "eip155",
	vchain: vedgeware,
};
