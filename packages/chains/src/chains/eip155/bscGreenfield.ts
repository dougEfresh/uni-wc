import { bscGreenfield as vbscGreenfield } from "viem/chains";
import {Chain} from "../chain";


export const bscGreenfield: Chain = {
	id: "eip155:" + vbscGreenfield.id,
	namespace: "eip155",
	vchain: vbscGreenfield,
};
