import { flowPreviewnet as vflowPreviewnet } from "viem/chains";
import {type Chain} from "../chain";


export const flowPreviewnet: Chain = {
	id: "eip155:" + vflowPreviewnet.id,
	namespace: "eip155",
	vchain: vflowPreviewnet,
};
