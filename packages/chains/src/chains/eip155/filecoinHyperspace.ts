import { filecoinHyperspace as vfilecoinHyperspace } from "viem/chains";
import {type Chain} from "../chain";


export const filecoinHyperspace: Chain = {
	id: "eip155:" + vfilecoinHyperspace.id,
	namespace: "eip155",
	vchain: vfilecoinHyperspace,
};
