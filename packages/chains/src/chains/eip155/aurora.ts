import { aurora as vaurora } from "viem/chains";
import {Chain} from "../chain";


export const aurora: Chain = {
	id: "eip155:" + vaurora.id,
	namespace: "eip155",
	vchain: vaurora,
};
