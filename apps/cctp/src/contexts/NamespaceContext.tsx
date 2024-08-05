'use client';
import {createContext, FC, ReactNode, useContext, useMemo, useState} from "react";
import {ConnectParams} from "@walletconnect/universal-provider";
import {NAMESPACE_MAIN, NAMESPACE_TEST} from "@uni-wc/chains";

interface IContext {
	namespace: ConnectParams | undefined
	setNamespace: (namespace: ConnectParams| undefined ) => void
}

export const NamespaceContext = createContext<IContext | undefined>(undefined);

export const NamespaceContextProvider: FC<{ children: ReactNode }> = ({
	                                                                   children,
                                                                   }) => {
	const [namespace , setNamespace ] = useState<ConnectParams | undefined>(NAMESPACE_TEST);

	const value: IContext = useMemo(() => (
		{
			namespace,
			setNamespace
		}
	), [namespace]);

	return (
		<NamespaceContext.Provider value={value}>
			{children}
		</NamespaceContext.Provider>
	)
}

export const useNamespace = () => {
	const context = useContext(NamespaceContext);
	if (context === undefined ) {
		throw new Error('useClientContext must be used within a ClientContextProvider');
	}
	return context;
};






