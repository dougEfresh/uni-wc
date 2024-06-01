import {ISolanaSession} from "@uni-wc/provider";
import {select, Separator, input} from "@inquirer/prompts";

import {AccountLayout, TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID} from "@solana/spl-token";
import {clusterApiUrl, Connection, PublicKey, StakeProgram} from "@solana/web3.js"

async function tokens(session: ISolanaSession, programId: PublicKey) {
	const connection = session.connection;
	const tokenAccounts = await connection.getTokenAccountsByOwner(
		session.account,
		{
			programId,
		}
	);

	console.log(programId);
	console.log("MintAccount                              Balance");
	console.log("------------------------------------------------------------");
	tokenAccounts.value.forEach((tokenAccount) => {
		const accountData = AccountLayout.decode(tokenAccount.account.data);
		console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`);
	})
	console.log("------------------------------------------------------------");
}

export async function handle_solana(session: ISolanaSession) {
	while (true) {
		const answer = await select({
			message: 'Choose an action',
			choices: [
				{
					name: "Info",
					value: "info",
					description: "Balances...etc",
				},
				{
					name: "Sign Message",
					value: "message",
					description: "",
				},
				{
					name: "Send Some Sol",
					value: "sendsol",
					description: "",
				},
				{
					name: "Stake",
					value: "stake",
					description: "",
				},
				{
					name: "Validators",
					value: "validators",
					description: "Balances...etc",
				},
				new Separator(),
				{
					name: "back",
					value: "back",
				}
			],
		});
		try {
			switch (answer) {
				case 'info':
					const slot = await session.connection.getSlot();
					const hash = await session.connection.getLatestBlockhash("confirmed");
					await tokens(session, TOKEN_PROGRAM_ID);
					await tokens(session, TOKEN_2022_PROGRAM_ID);
					const balance = await session.connection.getBalance(session.account, "confirmed");
					console.log(`SOL balance: ${balance}`);
					break;
				case 'validators':
					const validators = await session.connection.getVoteAccounts();
					console.log(`current validators ${validators.current.length}` );
					break;
				case 'stake':
					const accounts = await session.connection.getParsedProgramAccounts(
						StakeProgram.programId,
						{
							filters: [
								{
									memcmp: {
										offset: 12,
										bytes: session.account.toString()
									},
								},
							],
						},
					);
					console.log(JSON.stringify(accounts));
					break;
				case 'message':
					try {
						const msg: string = await input({
							message: "What is the message?"
						});
						const sig = await session.signMessage(msg);
						console.log(sig);
					} catch (e) {
						console.error(e);
					}
					break
				case'sendsol':
					try {
						const to: string = await input({
							message: "to whom?"
						});
						const amount: string = await input({
							message: "amount in lamports"
						});
						const sig = await session.sendSol(to, parseInt(amount, 10));
						console.log(sig);
					} catch (e) {
						console.error(e);
					}
					break
				case 'back':
					return
				default:
					return
			}
		} catch(e) {
			console.log(e);
		}
	}
}
