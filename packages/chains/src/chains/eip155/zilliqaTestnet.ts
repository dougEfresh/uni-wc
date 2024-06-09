import { zilliqaTestnet as vzilliqaTestnet } from "viem/chains";
import {Chain} from "../chain";


export const zilliqaTestnet: Chain = {
	id: "eip155:" + vzilliqaTestnet.id,
	namespace: "eip155",
	vchain: vzilliqaTestnet,
};
