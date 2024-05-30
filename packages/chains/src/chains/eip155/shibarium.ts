import { shibarium as vshibarium } from "viem/chains";
import {Chain} from "../chain.js";


export const shibarium: Chain = {
	id: "eip155:" + vshibarium.id,
	namespace: "eip155",
	vchain: vshibarium,
};
