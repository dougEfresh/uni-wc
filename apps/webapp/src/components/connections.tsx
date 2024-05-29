import {useChains, useConnections} from "wagmi";

export function Connections() {
	const connections = useConnections()

	return (
		<div>
			<h2>Connections</h2>
			{connections.map((connection) => (
				<div key={connection.connector.uid}>
					<div>connector {connection.connector.name}</div>
					<div>accounts: {JSON.stringify(connection.accounts)}</div>
					<div>chainId: {connection.chainId}</div>
				</div>
			))}
		</div>
	)
}
