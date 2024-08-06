import {createContext, FC, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {useSessionContext} from "@/contexts/SessionContext";
import {ChainSessions, chainSessions} from "@/chains/chain";

interface IContext {
	established: boolean,
	chains: ChainSessions | undefined
}

export const ChainContext = createContext<IContext>({established: false, chains: undefined});

export const ChainContextProvider: FC<{ children: ReactNode }> = ({
	                                                                    children,
                                                                    }) => {

	const { sessions } = useSessionContext();
	const [chains, setChains] = useState<ChainSessions>();
	const [established, setEstablished] = useState<boolean>(false);

	useEffect(() => {
		if (!sessions) {
			return;
		}
		try {
			const chains = chainSessions(sessions);
			setChains(chains);
			setEstablished(true)
		} catch (error) {
			console.error("Error creating session factory:", error);
		}
	}, [sessions]);


	const value: IContext = useMemo(() => ( {
			established,
			chains,
		}
		), [established, chains]);

	return (
		<ChainContext.Provider value={value}>
			{children}
		</ChainContext.Provider>
	)
}

export const useChainContext = () => {
	const context = useContext(ChainContext);
	if (context === undefined ) {
		throw new Error('useClientContext must be used within a ClientContextProvider');
	}
	return context;
};




