import { rss3Sepolia as vrss3Sepolia } from "viem/chains";
import {Chain} from "../chain";


export const rss3Sepolia: Chain = {
	id: "eip155:" + vrss3Sepolia.id,
	namespace: "eip155",
	vchain: vrss3Sepolia,
};
