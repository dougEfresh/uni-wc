import {ISolanaSession} from "@uni-wc/provider";
import {select, Separator, input, confirm} from "@inquirer/prompts";

import {AccountLayout, TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID} from "@solana/spl-token";
import {LAMPORTS_PER_SOL, PublicKey, StakeProgram} from "@solana/web3.js"
import {IStake, Stake, TransactionSession} from "@uni-wc/session-solana";

async function tokens(session: ISolanaSession, programId: PublicKey) {
	const connection = session.connection;
	const tokenAccounts = await connection.getTokenAccountsByOwner(
		session.account,
		{
			programId,
		}
	);

	console.log(programId.toString());
	console.log("MintAccount                              Balance");
	console.log("------------------------------------------------------------");
	tokenAccounts.value.forEach((tokenAccount) => {
		const accountData = AccountLayout.decode(tokenAccount.account.data);
		console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`);
	})
	console.log("------------------------------------------------------------");
}

async function handle_transaction(txSession: TransactionSession) {
	const answer = await input({
		message: "How much you want to stake in SOL units?"
	});
	const lamports = parseFloat(answer) * LAMPORTS_PER_SOL;
	const whom = await input({
		message: "To whom?"
	});
	const to: PublicKey = new PublicKey(whom);
	await txSession.send(to, lamports);
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
					name: "Send Transaction",
					value: "transaction",
					description: "",
				},
				{
					name: "Sign Message",
					value: "message",
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
			]
		});
		try {
			const staker = await Stake.init(session);
			const txSession = new TransactionSession(session);
			switch (answer) {
				case 'info':
					const slot = await session.connection.getSlot();
					const hash = await session.connection.getLatestBlockhash("confirmed");
					console.log(`Slot ${slot}    Block: ${hash.blockhash}`);
					await tokens(session, TOKEN_PROGRAM_ID);
					await tokens(session, TOKEN_2022_PROGRAM_ID);
					const balance = await session.connection.getBalance(session.account, "confirmed") / LAMPORTS_PER_SOL;
					console.log(`SOL balance: ${balance}`);
					const stake = staker.balance();
					console.log(`Staked: ${stake}`);
					console.log(`Address: ${session.account.toString()}`);
					break;
				case 'transaction':
					await handle_transaction(txSession);
					break;
				case 'validators':
					const validators = await session.connection.getVoteAccounts();
					console.log(`current validators ${validators.current.length}` );
					break;
				case 'stake':
					await handle_stake(staker);
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
				case 'back':
					return
				default:
					return
			}
		} catch(e) {
			console.log(e);
			const answer = await confirm({
				message: "Continue?"
			});
		}
	}
}

async function create_stake_account(staker: IStake) {
	const answer = await input({
		message: "How much you want to stake in SOL units?"
	});
	const lapmprts = parseFloat(answer) * LAMPORTS_PER_SOL;
	await staker.stake(undefined, lapmprts);
	console.log(lapmprts);
}

async function handle_stake(staker: IStake) {
	const choices = [
		{
			name: "Create New Stake Account",
			value: "newstake",
			description: ""
		},
		{
			name: "See Accounts (" + staker.stakedAccounts.length + ")",
			value: "accounts",
			description: ""
		},
		new Separator(),
		{
			name: "Back",
			value: "back"
		}
	];

	var answer = await select({
		choices: choices,
		default: undefined,
		loop: false,
		message: "What you want",
		pageSize: 5,
	});
	switch (answer) {
		case "newstake":
			await create_stake_account(staker);
			break;
		case "accounts":
			break;
		default:
			return
	}
}
