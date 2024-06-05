import {select, Separator} from '@inquirer/prompts';
import UniversalProvider  from "@walletconnect/universal-provider";
import {UniversalProviderFactory, ISessionFactory, IEipSession} from "@uni-wc/provider";
import {chainById} from "@uni-wc/chains";
import {Address} from "viem";
import {handle_solana} from "./solana.js";


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
			name: "Better Chains",
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
			await session.ping();
			break;
		case 'disconnect':
			console.log('Disconnecting...');
			await provider.disconnect();
			break;
		case 'evmchains':
			const evmchain = await select({
				choices: evmchains, default: "solana", loop: false,
				message: "Which Chain?",
				theme: undefined

			});
			const chain  = chainById(answer);
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
			const sol = session.solana();
			if (sol) {
				await handle_solana(sol);
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
		case'message':
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
		case 'back':
			return
		default:
			return
		}
	}
}
