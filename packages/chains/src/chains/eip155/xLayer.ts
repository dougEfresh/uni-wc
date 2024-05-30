import { xLayer as vxLayer } from "viem/chains";
import {Chain} from "../chain.js";


export const xLayer: Chain = {
	id: "eip155:" + vxLayer.id,
	namespace: "eip155",
	vchain: vxLayer,
};
