import { bscGreenfield as vbscGreenfield } from "viem/chains";
import {type Chain} from "../chain";


export const bscGreenfield: Chain = {
	id: "eip155:" + vbscGreenfield.id,
	namespace: "eip155",
	vchain: vbscGreenfield,
};
