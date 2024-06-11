import { coreDao as vcoreDao } from "viem/chains";
import {type Chain} from "../chain";


export const coreDao: Chain = {
	id: "eip155:" + vcoreDao.id,
	namespace: "eip155",
	vchain: vcoreDao,
};
