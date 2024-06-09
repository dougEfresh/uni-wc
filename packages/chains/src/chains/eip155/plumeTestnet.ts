import { plumeTestnet as vplumeTestnet } from "viem/chains";
import {Chain} from "../chain";


export const plumeTestnet: Chain = {
	id: "eip155:" + vplumeTestnet.id,
	namespace: "eip155",
	vchain: vplumeTestnet,
};
