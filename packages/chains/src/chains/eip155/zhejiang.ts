import { zhejiang as vzhejiang } from "viem/chains";
import {Chain} from "../chain.js";


export const zhejiang: Chain = {
	id: "eip155:" + vzhejiang.id,
	namespace: "eip155",
	vchain: vzhejiang,
};
