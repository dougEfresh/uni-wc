import { nautilus as vnautilus } from "viem/chains";
import {Chain} from "../chain";


export const nautilus: Chain = {
	id: "eip155:" + vnautilus.id,
	namespace: "eip155",
	vchain: vnautilus,
};
