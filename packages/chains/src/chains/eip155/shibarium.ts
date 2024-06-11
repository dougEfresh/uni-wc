import { shibarium as vshibarium } from "viem/chains";
import {type Chain} from "../chain";


export const shibarium: Chain = {
	id: "eip155:" + vshibarium.id,
	namespace: "eip155",
	vchain: vshibarium,
};
