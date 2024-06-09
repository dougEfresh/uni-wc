import { dreyerxMainnet as vdreyerxMainnet } from "viem/chains";
import {Chain} from "../chain";


export const dreyerxMainnet: Chain = {
	id: "eip155:" + vdreyerxMainnet.id,
	namespace: "eip155",
	vchain: vdreyerxMainnet,
};
