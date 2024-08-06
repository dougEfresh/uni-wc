'use client';
import {ISessionFactory,  UniversalProviderFactory} from "@uni-wc/provider";
import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import type { FC, ReactNode } from 'react';
import {useClientContext} from "@/contexts/ClientContext";

interface IContext {
	sessions: ISessionFactory | undefined,
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
		try {
			const sessions = UniversalProviderFactory.sessionFactory();
			setSessions(sessions);
		} catch (error) {
			console.error("Error creating session factory:", error);
		}
	}, [provider]);

	const value: IContext = useMemo(() => ({
		sessions
	}), [sessions]);

	return (
		<SessionContext.Provider value={value} >
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
