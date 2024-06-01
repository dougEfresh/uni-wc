import { saigon as vsaigon } from "viem/chains";
import {Chain} from "../chain.js";


export const saigon: Chain = {
	id: "eip155:" + vsaigon.id,
	namespace: "eip155",
	vchain: vsaigon,
};