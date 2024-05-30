import { rootstock as vrootstock } from "viem/chains";
import {Chain} from "../chain.js";


export const rootstock: Chain = {
	id: "eip155:" + vrootstock.id,
	namespace: "eip155",
	vchain: vrootstock,
};
