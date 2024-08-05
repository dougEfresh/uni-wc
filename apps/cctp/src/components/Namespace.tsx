
import {useNamespace} from "../contexts/NamespaceContext";
import {NAMESPACE_MAIN, NAMESPACE_TEST} from "@uni-wc/chains";

export default function Namespace() {
	const {setNamespace} = useNamespace();

	return (
		<div className="space-x-4">
			<button className="btn btn-main" onClick={() => setNamespace(NAMESPACE_MAIN)}>Main</button>
			<button className="btn btn-test" onClick={() => setNamespace(NAMESPACE_TEST)}>Test</button>
		</div>
	);
}
