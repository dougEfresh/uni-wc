import { stratis as vstratis } from "viem/chains";
import {type Chain} from "../chain";


export const stratis: Chain = {
	id: "eip155:" + vstratis.id,
	namespace: "eip155",
	vchain: vstratis,
};
