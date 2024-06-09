import { crossbell as vcrossbell } from "viem/chains";
import {Chain} from "../chain";


export const crossbell: Chain = {
	id: "eip155:" + vcrossbell.id,
	namespace: "eip155",
	vchain: vcrossbell,
};
