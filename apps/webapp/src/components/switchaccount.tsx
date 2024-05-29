import {useAccount, useSwitchAccount} from "wagmi";

export function SwitchAccount() {
	const account = useAccount()
	const { connectors, switchAccount } = useSwitchAccount()

	return (
		<div>
			<h2>Switch Account</h2>

			{connectors.map((connector) => (
				<button
					disabled={account.connector?.uid === connector.uid}
					key={connector.uid}
					onClick={() => switchAccount({ connector })}
					type="button"
				>
					{connector.name}
				</button>
			))}
		</div>
	)
}
