import { nexilix as vnexilix } from "viem/chains";
import {Chain} from "../chain.js";


export const nexilix: Chain = {
	id: "eip155:" + vnexilix.id,
	namespace: "eip155",
	vchain: vnexilix,
};
