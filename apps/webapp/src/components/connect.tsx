import {configMain, configTest, projectId} from "@/config";
import {createWeb3Modal} from "@web3modal/wagmi/react";
import {useConnect} from "wagmi";

const mainnet = createWeb3Modal({
	wagmiConfig: configMain,
	projectId,
	enableAnalytics: false, // Optional - defaults to your Cloud configuration
	enableOnramp: false, // Optional - false as default
	allowUnsupportedChain: true,
});


const testnet = createWeb3Modal({
	wagmiConfig: configTest,
	projectId,
	enableAnalytics: false, // Optional - defaults to your Cloud configuration
	enableOnramp: false, // Optional - false as default
	allowUnsupportedChain: true,
});

export function Connect() {
	const { connectors, connect, status, error } = useConnect()

	return (
		<div>
			<h2>Connect</h2>
			{connectors.filter((p) => p.name === "WalletConnect").map((connector) => (
				<div id={connector.id} key={connector.uid} className="px-8">
					<button
						id={connector.uid}
						key={connector.uid}
						onClick={() => connect({connector})}
						type="button"
					>
						{connector.name}
					</button>
				</div>
			))}
			<h3>{status}</h3>
			<div>{error?.message}</div>
		</div>
	)
}
