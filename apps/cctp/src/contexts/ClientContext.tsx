'use client';

import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import type { FC, ReactNode } from 'react';
import UniversalProvider from "@walletconnect/universal-provider";
import { RELAYER_EVENTS } from "@walletconnect/core";

import {UniversalProviderFactory} from "@uni-wc/provider";
import pino from "pino";
import {useNamespace} from "@/contexts/NamespaceContext";
import {SessionTypes} from "@walletconnect/types";

const logger = pino( { level: "warn"});

interface IContext {
	provider: UniversalProvider | undefined;
	session: SessionTypes.Struct | undefined,
	uri: string | undefined,
	isInitializing: boolean;
}


export const ClientContext = createContext<IContext>({} as IContext);


export const ClientContextProvider: FC<{ children: ReactNode }> = ({
	                                                                   children,
                                                                   }) => {

	const [uri , setUri] = useState<string|undefined>(undefined);



	const [provider, setProvider] = useState<UniversalProvider>();
	const [isInitializing, setIsInitializing] = useState(false);
	const [session, setSession] = useState<SessionTypes.Struct>();
	const { namespace } = useNamespace();

	const createClient = useCallback(async () => {
		const opts  = {
			dryRun: false,
			client: undefined,
			disableProviderPing: false,
			logger: logger,
			metadata: {
				name: "uni-walletconnect",
				description: "just use walletconnect",
				url: "https://github.com/dougEfresh",
				icons: [],
				verifyUrl: undefined,
				redirect: undefined,
			},
			projectId: "80a11e83ad1dfde39aff286eb6d74554",
			storage: undefined,
			sessionProposalCallback: async (uri: string) => {
				console.log(`got pairing uri ${uri}`);
				setUri(uri);
			}
		};
		setIsInitializing(true);
		console.log("Creating client");
		try {
			UniversalProviderFactory.configure(opts);
			const provider = await UniversalProviderFactory.getProvider();
			console.log(`connecting with namespace ${JSON.stringify(namespace)}`);
			await provider.connect(namespace!);
			if (!provider.session) {
				console.log("new pairing");
				await provider.pair(undefined);
			}
			await provider.enable();
			setProvider(provider);
			setSession(provider.session);
			console.log(`${provider.session?.acknowledged}  ${provider.session?.pairingTopic} ${JSON.stringify(provider.session?.sessionProperties)}  ${JSON.stringify(provider.session?.sessionProperties)}`);
		} catch (e){
			console.error(e);
		} finally {
			setIsInitializing(false);
		}
	}, [namespace]);

	useEffect(() => {
		console.info(`useEffect ${isInitializing}  provider=${provider !== undefined} namespace=${namespace !== undefined}`);
		if (!namespace) {
			return
		}
		if (!provider) {
			if (!isInitializing) {
				createClient().then( () => console.log("client created") );
			}
		}
	}, [provider, isInitializing, createClient, namespace]);


	useEffect(() => {

	});

	useEffect(() => {
		if (!provider) return;


		provider.client.core.relayer.on(RELAYER_EVENTS.connect, () => {
			/*
			toast.success("Network connection is restored!", {
				position: "bottom-left",
			});
			 */
			console.log("Network connection is restored!");
		});

		provider.client.core.relayer.on(RELAYER_EVENTS.disconnect, () => {
			/*
			toast.error("Network connection lost.", {
				position: "bottom-left",
			});
			 */
			console.warn("Network connection lost!");
		});
	}, [provider]);

	const value: IContext = useMemo(() => ({
		provider,
		uri,
		session,
		isInitializing
	}), [
		provider,
		session,
		uri,
		isInitializing
	]);

	return (
		<ClientContext.Provider
			value={{
				...value
			}}
		>
			{children}
		</ClientContext.Provider>
	)
}

export const useClientContext = () => {
	const context = useContext(ClientContext);
	if (!context) {
		throw new Error('useClientContext must be used within a ClientContextProvider');
	}
	return context;
};
