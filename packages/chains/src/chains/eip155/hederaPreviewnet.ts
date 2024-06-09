import { hederaPreviewnet as vhederaPreviewnet } from "viem/chains";
import {Chain} from "../chain";


export const hederaPreviewnet: Chain = {
	id: "eip155:" + vhederaPreviewnet.id,
	namespace: "eip155",
	vchain: vhederaPreviewnet,
};
