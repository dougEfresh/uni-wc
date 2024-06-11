import { foundry as vfoundry } from "viem/chains";
import {type Chain} from "../chain";


export const foundry: Chain = {
	id: "eip155:" + vfoundry.id,
	namespace: "eip155",
	vchain: vfoundry,
};
