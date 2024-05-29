import {useBlockNumber} from "wagmi";

export function BlockNumber() {

	const { data: account_ } = useBlockNumber({ watch: true })

	return (
		<div className={"pt-5"}>
			<h2>Block Number</h2>
			<div>Block Number (Account Chain): {account_?.toString()}</div>
		</div>
	)
}

