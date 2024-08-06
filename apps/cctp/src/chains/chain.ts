import {IEipSession, ISessionFactory, ISolanaSession} from "@uni-wc/provider";
import SOL from "assets/chains/SOL.svg";
import ETH from "assets/chains/ETH.svg";
import AVAX from "assets/chains/AVAX.svg";
import ARB from "assets/chains/ARB.svg";
import {
	Chain,
	solanadev,
	solana,
	sepolia,
	baseSepolia,
	arbitrumSepolia,
	avalancheFuji,
	mainnet,
	polygon,
	polygonAmoy,
	bob, avalanche, arbitrum
} from "@uni-wc/chains";


export interface ChainSession {
	icon?: any,
	session: IEipSession | ISolanaSession
}

function iconMap(chain: Chain): any | undefined {
	if (chain === sepolia || mainnet) {
		return ETH;
	}
	if (chain === avalanche || avalancheFuji) {
		return AVAX;
	}

	if (chain === solana || solanadev) {
		return SOL;
	}

	if (chain === arbitrumSepolia || arbitrum) {
		return ARB;
	}

	return undefined
}

export interface ChainSessions {
	sol: ChainSession | undefined,
	eth: ChainSession | undefined ,
	avax: ChainSession | undefined,
	arb: ChainSession | undefined,
}

export const chainSessions = (sessions: ISessionFactory): ChainSessions => {
	const sol = sessions.solana();
	if (!sol) {
		throw new Error(`solana not found`);
	}
	let  chainSessions: ChainSessions = {
		sol: undefined,
		eth: undefined,
		avax: undefined,
		arb: undefined
	}
	if (sol) {
		chainSessions.sol = {
			session: sol,
			icon: iconMap(sol.chain),
		}
	}

	const eth = sessions.chains.find((c) => c.id === mainnet.id || c.id === sepolia.id);
	const avax = sessions.chains.find((c) => c.id === avalanche.id || c.id === avalancheFuji.id);
	const arb  = sessions.chains.find((c) => c.id === arbitrum.id || c.id === arbitrumSepolia.id);
	if (eth) {
		chainSessions.eth = {
			session: sessions.eip(eth.id)!,
			icon: iconMap(eth)
		}
	}

	if (avax) {
		chainSessions.avax = {
			session: sessions.eip(avax.id)!,
			icon: iconMap(avax)
		}
	}
	if (arb) {
		chainSessions.arb = {
			session: sessions.eip(arb.id)!,
			icon: iconMap(arb)
		}
	}

	return chainSessions;
}

