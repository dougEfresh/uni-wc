import { mainnet, sepolia } from 'wagmi/chains'
import {createConfig, http} from "wagmi";
import { walletConnect } from 'wagmi/connectors'

// Get projectId at https://cloud.walletconnect.com
export const projectId: string = "80a11e83ad1dfde39aff286eb6d74554";

const metadata = {
	name: 'Web3Modal',
	description: 'Web3Modal Example',
	url: 'https://web3modal.com', // origin must match your domain & subdomain
	icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const configTest = createConfig({
	chains: [sepolia],
	transports: {
		[sepolia.id]: http()
	},
	connectors: [
		walletConnect({ projectId, metadata, showQrModal: true , qrModalOptions: {
				themeMode: "light"
			}}),
	],
	ssr: true,
});


// Create wagmiConfig
export const configMain = createConfig({
	chains: [mainnet],
	transports: {
		[mainnet.id]: http()
	},
	connectors: [
		walletConnect({ projectId, metadata, showQrModal: true , qrModalOptions: {
				themeMode: "dark"
			}}),
	],
	ssr: true,
});
