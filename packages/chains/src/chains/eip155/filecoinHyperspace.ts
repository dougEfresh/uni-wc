import { filecoinHyperspace as vfilecoinHyperspace } from "viem/chains";
import {Chain} from "../chain.js";


export const filecoinHyperspace: Chain = {
	id: "eip155:" + vfilecoinHyperspace.id,
	namespace: "eip155",
	vchain: vfilecoinHyperspace,
};
