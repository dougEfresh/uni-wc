import { beamTestnet as vbeamTestnet } from "viem/chains";
import {Chain} from "../chain.js";


export const beamTestnet: Chain = {
	id: "eip155:" + vbeamTestnet.id,
	namespace: "eip155",
	vchain: vbeamTestnet,
};
