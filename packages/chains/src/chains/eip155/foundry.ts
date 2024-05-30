import { foundry as vfoundry } from "viem/chains";
import {Chain} from "../chain.js";


export const foundry: Chain = {
	id: "eip155:" + vfoundry.id,
	namespace: "eip155",
	vchain: vfoundry,
};
