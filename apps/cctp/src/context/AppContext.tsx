import { createContext, useContext, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import UniversalProvider from "@walletconnect/universal-provider";

interface AppState {
	provider?: UniversalProvider
}

const initialState: AppState = {};
const AppContext = createContext<AppState>(initialState)
const useProviderState = () => {
	const [provider, setProviderState] = useState<UniversalProvider>();

};
export const AppContextProvider: FC<{ children: ReactNode }> = ({
	                                                                children,
                                                                }) => {
	return (
		<AppContext.Provider
			value={{
				provider: useProviderState(),
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useAppContext = () => useContext(AppContext)
