import { edgelessTestnet as vedgelessTestnet } from "viem/chains";
import {Chain} from "../chain";


export const edgelessTestnet: Chain = {
	id: "eip155:" + vedgelessTestnet.id,
	namespace: "eip155",
	vchain: vedgelessTestnet,
};
