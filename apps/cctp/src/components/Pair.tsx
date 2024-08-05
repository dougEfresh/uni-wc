import {useClientContext} from "@/contexts/ClientContext";
import QRCode from 'qrcode.react';

export default function Pair() {
	const {uri, session} = useClientContext();

	if (session) {
		return (
			<div>
				<p>{session.topic}</p>
				<p>{session.acknowledged}</p>
				<p>{Object.keys(session.namespaces).join(",")}</p>
			</div>
		)
	}
	if (uri) {
		return (
			<div className="space-x-4">
				<QRCode value={uri} />
			</div>
		)
	}
	return (
		<div>
			<p>Awaiting pairing URI</p>
		</div>
	);
}
