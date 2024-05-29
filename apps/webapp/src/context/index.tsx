'use client'

import React, {ReactNode, useState} from 'react'
import { configMain, configTest, projectId } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'
import { Switch } from '@headlessui/react'

// Setup queryClient
const queryClient = new QueryClient()
if (!projectId) throw new Error('Project ID is not defined')


export default function Web3ModalProvider({
	                                          children,
	                                          initialState
                                          }: {
	children: ReactNode
	initialState?: State
}) {

	const [testnet, setTestNet] = useState(true);
	const toggleNetwork = () => {
		setTestNet(!testnet)
	}

	const provider = (testnet: boolean) => {
		return (
			<WagmiProvider config={testnet ? configTest : configMain} initialState={initialState}>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</WagmiProvider>
		)
	};

	return (
		<div>
			<div className="flex items-center justify-center mb-4">
				<span className="mr-2">Mainnet</span>
				<Switch
					checked={testnet}
					onChange={toggleNetwork}
					className={`${
						testnet ? 'bg-blue-600' : 'bg-gray-200'
					} relative inline-flex items-center h-6 rounded-full w-11`}
				>
					<span className="sr-only">{testnet ? "Test" : "Main"}</span>
					<span
						className={`${
							testnet ? 'translate-x-6' : 'translate-x-1'
						} inline-block w-4 h-4 transform bg-white rounded-full`}
					/>
				</Switch>
				{provider(testnet)}
			</div>
		</div>
	)
	/*
	if (testnet) {
		return (
			<div>
			<WagmiProvider config={configTest} initialState={initialState}>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</WagmiProvider>
			</div>
		)
	} else {
		return (
			<WagmiProvider config={configMain} initialState={initialState}>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</WagmiProvider>
		)
	}
	 */
}

// Create modal
/*

+
 */
