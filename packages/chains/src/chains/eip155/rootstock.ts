import { rootstock as vrootstock } from "viem/chains";
import {type Chain} from "../chain";


export const rootstock: Chain = {
	id: "eip155:" + vrootstock.id,
	namespace: "eip155",
	vchain: vrootstock,
};
