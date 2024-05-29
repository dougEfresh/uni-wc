import {useConnectorClient} from "wagmi";

export function ConnectorClient() {
	const {data, error} = useConnectorClient()

	return (
		<div>
			<h2>Connector Client</h2>
	client {data?.account?.address} {data?.chain?.id}
	{error?.message}
	</div>
	)
}


