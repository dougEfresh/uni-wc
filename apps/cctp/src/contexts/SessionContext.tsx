'use client';
import {IEipSession, ISessionFactory, ISolanaSession, UniversalProviderFactory} from "@uni-wc/provider";
import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import type { FC, ReactNode } from 'react';
import {useClientContext} from "@/contexts/ClientContext";
import {sepolia, baseSepolia, arbitrumSepolia, avalancheFuji, mainnet, optimismSepolia, optimism, polygon, polygonAmoy} from "@uni-wc/chains";

const evmChans = [
	sepolia,
	baseSepolia,
	arbitrumSepolia,
	avalancheFuji,
	mainnet,
	optimism,
	optimismSepolia,
	polygon,
	polygonAmoy
];

interface IContext {
	solana: ISolanaSession | undefined;
	evms: IEipSession[];
}

function getEvms(sessions: ISessionFactory | undefined): IEipSession[] {
	const evms: IEipSession[] = [];
	if (!sessions){
		return evms;
	}
	for (const c  of evmChans) {
		const found = sessions?.eip(c.id)
		if (found) {
			evms.push(found);
		}
	}
	return evms
}

export const SessionContext = createContext<IContext>({} as IContext);

export const SessionContextProvider: FC<{ children: ReactNode }> = ({
	                                                                   children,
                                                                   }) => {
	const { provider } = useClientContext();
	const [sessions, setSessions] = useState<ISessionFactory>();

	useEffect(() => {
		if (!provider) {
			return;
		}
		const sessions = UniversalProviderFactory.sessionFactory();
		setSessions(sessions);

	}, [provider]);

	const value: IContext = useMemo(() => ({
		solana: sessions?.solana(),
		evms: getEvms(sessions),
	}), [sessions]);

	return (
		<SessionContext.Provider value={{...value}} >
			{children}
		</SessionContext.Provider>
	)
}

export const useSessionContext = () => {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error('useSessionContext must be used within a Session');
	}
	return context;
};
