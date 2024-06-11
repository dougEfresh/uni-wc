import { nexilix as vnexilix } from "viem/chains";
import {type Chain} from "../chain";


export const nexilix: Chain = {
	id: "eip155:" + vnexilix.id,
	namespace: "eip155",
	vchain: vnexilix,
};
