import { bscGreenfield as vbscGreenfield } from "viem/chains";
import {Chain} from "../chain.js";


export const bscGreenfield: Chain = {
	id: "eip155:" + vbscGreenfield.id,
	namespace: "eip155",
	vchain: vbscGreenfield,
};
