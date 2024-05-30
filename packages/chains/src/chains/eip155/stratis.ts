import { stratis as vstratis } from "viem/chains";
import {Chain} from "../chain.js";


export const stratis: Chain = {
	id: "eip155:" + vstratis.id,
	namespace: "eip155",
	vchain: vstratis,
};
