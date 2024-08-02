import {input, select, Separator} from '@inquirer/prompts';
import UniversalProvider from "@walletconnect/universal-provider";
import {type IEipSession, type ISessionFactory, UniversalProviderFactory} from "@uni-wc/provider";
import {chainById, cosmos, solana, solanadev} from "@uni-wc/chains";
import {type Address, parseEther} from "viem";
import {handle_solana} from "./solana";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";


export async function displayMenu(): Promise<void> {
	const provider: UniversalProvider = await UniversalProviderFactory.getProvider();
	if (!UniversalProviderFactory.sessionFactory()) {
		throw new Error("session not initialized");
	}
	const session: ISessionFactory  = UniversalProviderFactory.sessionFactory()!;
	const evmchains: any[] = session.chains.filter((c) => c.id.startsWith("eip155")).map((c) => {
		return {
			name: c.vchain.name,
			value: c.id,
			description: 'Explore ' + c.vchain.name,
		}
	});
	const betterchains = session.chains.filter((c) => !c.id.startsWith("eip155")).map((c) => {
			return {
				name: c.vchain.name,
				value: c.id,
				description: 'Explore ' + c.vchain.name,
			}
		}
	);
	const choices = [
		{
			name: "Non EVM",
			value: "betterchains",
		},
		{
			name: "Evm Chains",
			value: "evmchains",
		},
			new Separator(),
			{
				name: 'ping',
				value: 'ping',
				description: 'ping session',
			},
			{
				name: 'pair',
				value: 'pair',
				description: 'repair',
			},
		{
			name: 'disconnect',
			value: 'disconnect',
			description: 'clear session',
		},

			{
				name: 'exit',
				value: 'exit',
				description: 'end',
			},
	];

	const answer: string = await select({
		message: 'Choose your path',
		choices: choices,
		default: "betterchains",
		loop: true
	});

	switch (answer) {
		case 'ping':
			try {
				await withTimeout(session.ping(), 5000);
			} catch (e) {
				console.error(e);
			}
			break;
		case 'disconnect':
			console.log('Disconnecting...');
			await provider.disconnect();
			break;
		case 'evmchains':
			const evmchain: string = await select({
				choices: evmchains,
				loop: true,
				message: "Which Chain?",
				theme: undefined
			});
			const chain  = chainById(evmchain);
			if (!chain) {
				console.log('Invalid choice', answer);
				break;
			}
			const eipSession = session.eip(chain.id);
			if (eipSession) {
				await handle_eip_chain(eipSession);
			}
			break;
		case 'betterchains':
			const bchain = await select({
				choices: betterchains,
				default: "solana",
				loop: false,
				message: "Which Chain?",
				pageSize: 5, theme: undefined
			})
			const c = chainById(bchain);
			if (!c) {
				throw new Error(`${bchain} is an unknown chain`);
			}
			if (c.id === solanadev.id || c.id == solana.id) {
				const sol = session.solana();
				if (sol) {
					await handle_solana(sol);
				}
			}
			if (c.id === cosmos.id) {
				const cos = session.cosmos();
				if (cos) {
					console.log(cos.account);
					await input({message: "blah"});
				}
			}
			break;
		case 'pair':
			await provider.pair(undefined);
			break;
		case 'exit':
			process.exit();
			break;
		default:
			break;
			/*
			const chain  = chainById(answer);
			if (!chain) {
				console.log('Invalid choice', answer);
				break;
			}
			const eipSession = session.eip(chain.id);
			if (eipSession) {
				await handle_eip_chain(eipSession);
				break;
			}

			break;
			*/
	}
	// Go back to the main menu
	console.clear();
	displayMenu();
}



async function handle_eip_chain(session: IEipSession) {

	while (true) {
		const answer = await select({
			message: 'Choose your path',
			choices: [
				{
					name: "Info",
					value: "info",
					description: "",
				},
				{
					name: "Transfer",
					value: "transfer",
					description: "",
				},
				{
					name: "Sign Message",
					value: "message",
					description: "",
				},
				new Separator(),
				{
					name: "back",
					value: "back",
				}
			],
		});

		switch(answer) {
			case 'transfer':
				const answer = await input({
					message: "How much you want to stake in ETH units?"
				});
				const eth = parseEther(answer);
				const whom = await input({
					message: "To whom?"
				});
				try {
					await session.wc.switchChain({id: session.chain.vchain.id});
					const request = await session.wc.prepareTransactionRequest({
						account: session.account,
						to: whom as Address,
						value: eth,
						chain: session.chain.vchain,
					});
					const tx = {
						account: session.account,
						...request
					};
					const serializedTransaction = await session.wc.sendTransaction(tx);
					console.log(serializedTransaction);
				} catch (e) {
				console.error(e);
				}
				break
			case 'message':
				try {
					const sig = await session.wc.signMessage({
						account: session.account as Address,
						message: 'yo, sup.'
					});
					console.log("Sig " , sig);
				} catch(e) {
					console.error(e);
				}
				break
			case 'info':
				console.log(`Account ${session.account}`)
				const balance = await session.pc.getBalance({address: session.account});
				console.log(`Balance ${balance}`);
				break;
			case 'back':
				return
			default:
				return
		}
	}
}

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
	const timeout = new Promise<T>((_, reject) =>
		setTimeout(() => reject(new Error('Operation timed out')), ms)
	);
	return Promise.race([promise, timeout]);
}
