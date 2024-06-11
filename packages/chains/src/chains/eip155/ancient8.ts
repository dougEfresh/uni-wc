import { ancient8 as vancient8 } from "viem/chains";
import {type Chain} from "../chain";


export const ancient8: Chain = {
	id: "eip155:" + vancient8.id,
	namespace: "eip155",
	vchain: vancient8,
};
