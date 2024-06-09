import { ancient8Sepolia as vancient8Sepolia } from "viem/chains";
import {Chain} from "../chain";


export const ancient8Sepolia: Chain = {
	id: "eip155:" + vancient8Sepolia.id,
	namespace: "eip155",
	vchain: vancient8Sepolia,
};
