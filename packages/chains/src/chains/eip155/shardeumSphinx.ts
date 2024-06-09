import { shardeumSphinx as vshardeumSphinx } from "viem/chains";
import {Chain} from "../chain";


export const shardeumSphinx: Chain = {
	id: "eip155:" + vshardeumSphinx.id,
	namespace: "eip155",
	vchain: vshardeumSphinx,
};
