import { beamTestnet as vbeamTestnet } from "viem/chains";
import {type Chain} from "../chain";


export const beamTestnet: Chain = {
	id: "eip155:" + vbeamTestnet.id,
	namespace: "eip155",
	vchain: vbeamTestnet,
};
