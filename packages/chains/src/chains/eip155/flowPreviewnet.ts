import { flowPreviewnet as vflowPreviewnet } from "viem/chains";
import {Chain} from "../chain.js";


export const flowPreviewnet: Chain = {
	id: "eip155:" + vflowPreviewnet.id,
	namespace: "eip155",
	vchain: vflowPreviewnet,
};