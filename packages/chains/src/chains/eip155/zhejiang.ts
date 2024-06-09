import { zhejiang as vzhejiang } from "viem/chains";
import {Chain} from "../chain";


export const zhejiang: Chain = {
	id: "eip155:" + vzhejiang.id,
	namespace: "eip155",
	vchain: vzhejiang,
};
