import { moonriver as vmoonriver } from "viem/chains";
import {Chain} from "../chain";


export const moonriver: Chain = {
	id: "eip155:" + vmoonriver.id,
	namespace: "eip155",
	vchain: vmoonriver,
};
