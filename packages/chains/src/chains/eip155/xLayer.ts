import { xLayer as vxLayer } from "viem/chains";
import {type Chain} from "../chain";


export const xLayer: Chain = {
	id: "eip155:" + vxLayer.id,
	namespace: "eip155",
	vchain: vxLayer,
};
