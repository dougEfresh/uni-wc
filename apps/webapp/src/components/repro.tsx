import {useChainId, useChains} from "wagmi";
import {switchChain} from "viem/actions";
import {optimism, sepolia} from "wagmi/chains";
import {configMain, configTest} from "@/config";

export function Repro() {
	const chainId = useChainId()
	const chains = useChains();
	const isTest = () => {
		const found = chains.find((c) => {
			return c.testnet
		});
		return found !== undefined;
	}
	console.log('chainId from useChainId is', chainId)
	//onClick={() => switchChain(configMain, {chainId: sepolia.id})}
	const mainSwitch =  () => {
		// @ts-ignore
		return (
		<main className="flex min-h-screen flex-col items-center p-24">
			Current Chain Id: {chainId}
			<button
				type="button"

			>
				Switch to Polygon
			</button>
			<button
				type="button"
			>
				Switch to Arbitrum
			</button>
		</main>
		);
	};
	return  (mainSwitch());
}
