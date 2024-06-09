import { zilliqa as vzilliqa } from "viem/chains";
import {Chain} from "../chain";


export const zilliqa: Chain = {
	id: "eip155:" + vzilliqa.id,
	namespace: "eip155",
	vchain: vzilliqa,
};
