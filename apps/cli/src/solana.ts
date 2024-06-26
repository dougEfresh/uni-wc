import {DryRunModeError, type ISolanaSession, UniversalProviderFactory} from "@uni-wc/provider";
import {select, Separator, input, confirm} from "@inquirer/prompts";

import {AccountLayout, TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID} from "@solana/spl-token";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js"
import {type IStake, Stake, TokenManagement, TransactionSession} from "@uni-wc/session-solana";

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

async function handle_fee_market(session: ISolanaSession) {
	const prioritizationFeeObjects = await session.connection.getRecentPrioritizationFees();
	if (prioritizationFeeObjects.length === 0) {
		console.log('No prioritization fee data available.');
		return;
	}
	// Extract slots and sort them
	const slots = prioritizationFeeObjects.map(feeObject => feeObject.slot).sort((a, b) => a - b);

	// Extract slots range
	const slotsRangeStart = slots[0];
	const slotsRangeEnd = slots[slots.length - 1];

	// Calculate the average including zero fees
	const averageFeeIncludingZeros = prioritizationFeeObjects.length > 0
		? Math.floor(prioritizationFeeObjects.reduce((acc, feeObject) => acc + feeObject.prioritizationFee, 0) / prioritizationFeeObjects.length)
		: 0;

	// Filter out prioritization fees that are equal to 0 for other calculations
	const nonZeroFees = prioritizationFeeObjects
		.map(feeObject => feeObject.prioritizationFee)
		.filter(fee => fee !== 0);

	// Calculate the average of the non-zero fees
	const averageFeeExcludingZeros = nonZeroFees.length > 0
		? Math.floor(nonZeroFees.reduce((acc, fee) => acc + fee, 0) / nonZeroFees.length )
		: 0;

	// Calculate the median of the non-zero fees
	const sortedFees = nonZeroFees.sort((a, b) => a - b);
	let medianFee = 0;
	if (sortedFees.length > 0) {
		const midIndex = Math.floor(sortedFees.length / 2);
		medianFee = sortedFees.length % 2 !== 0
			? sortedFees[midIndex]
			: Math.floor((sortedFees[midIndex - 1] + sortedFees[midIndex]) / 2);
	}

	console.log(`Slots examined for priority fees: ${prioritizationFeeObjects.length}`)
	console.log(`Slots range examined from ${slotsRangeStart} to ${slotsRangeEnd}`);
	console.log('====================================================================================')

	// You can use averageFeeIncludingZeros, averageFeeExcludingZeros, and medianFee in your transactions script
	console.log(` 💰 Average Prioritization Fee (including slots with zero fees): ${averageFeeIncludingZeros} micro-lamports.`);
	console.log(` 💰 Average Prioritization Fee (excluding slots with zero fees): ${averageFeeExcludingZeros} micro-lamports.`);
	console.log(` 💰 Median Prioritization Fee (excluding slots with zero fees): ${medianFee} micro-lamports.`);
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
	const sig = await txSession.send(to, lamports);
	console.log(sig);
}

async function handle_token_management(session: ISolanaSession) {
	const manager = await TokenManagement.init(session, UniversalProviderFactory.context )
	const answer = await select({
		choices: [
			{
				name: "Info",
				description: "",
				value: "info"
			}
		],
		pageSize: 5,
		loop: true,
		message: "Pick your poison"
	})

	switch (answer) {
		case "info":
			UniversalProviderFactory.context.logger.info(' ACCOUNTS ' + JSON.stringify(manager.tokens(TOKEN_PROGRAM_ID)));
			await input({message: "continue"});
			break;
		default:
			return;
	}
}

export async function handle_solana(session: ISolanaSession) {
	while (true) {
		const answer = await select({
			message: 'Choose an action',
			loop: false,
			pageSize: 10,
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
					name: "Token Management",
					value: "tokenmgt",
					description: "SPL tokens",
				},
				new Separator(),
				{
					name: "Fees",
					value: "fees",
				},
				{
					name: "back",
					value: "back",
				}
			]
		});
		try {
			const staker = await Stake.init(session, UniversalProviderFactory.context);
			const txSession = new TransactionSession(session);
			switch (answer) {
				case 'info':
					console.log("getting slot");
					const slot = await session.connection.getSlot();
					const hash = await session.connection.getLatestBlockhash("confirmed");
					console.log(`Slot ${slot}    Block: ${hash.blockhash}`);
					await tokens(session, TOKEN_PROGRAM_ID);
					await tokens(session, TOKEN_2022_PROGRAM_ID);
					const balance = await session.connection.getBalance(session.account, "confirmed") / LAMPORTS_PER_SOL;
					console.log(`SOL balance: ${balance}`);
					const stake = staker.balance() / LAMPORTS_PER_SOL;
					console.log(`Staked: ${stake}`);
					console.log(`Address: ${session.account.toString()}`);
					break;
				case 'transaction':
					await handle_transaction(txSession);
					break;
				case 'tokenmgt':
					await handle_token_management(session);
					break;
				case 'stake':
					await handle_stake(staker);
					break;
				case 'fees':
					await handle_fee_market(session);
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

			if (e instanceof DryRunModeError) {
				console.log(`${e.message}`);
			} else {
				console.log(e);
			}
			const answer = await confirm({
				message: "Continue?"
			});
			console.clear();
		}
	}
}

async function create_stake_account(staker: IStake) {
	const answer = await input({
		message: "How much you want to stake in SOL units?"
	});
	const lapmprts = parseFloat(answer) * LAMPORTS_PER_SOL;
	console.log("Check wallet to validate signature");
	const sig = await staker.stake(lapmprts, undefined);
	console.log(sig);
}

async function show_stake_accounts(staker: IStake) {
	let choices = [];
	const accounts = staker.stakedAccounts();
	for (let i = 0; i < accounts.length; i++) {
		const a = accounts[i];
		choices.push({
			name: a.pubkey.toString()  + ` (${a.account.lamports / LAMPORTS_PER_SOL} SOL)`,
			value: i,
			description: a.status.state,
		})
	}
	const answer = await select({
		choices: choices,
		default: undefined,
		loop: true,
		message: "What you want",
		pageSize: 10,
	});
	const account = staker.stakedAccounts()[answer];
	const action = await select({
		choices: [
			{
				name: "Withdraw",
				value: "withdraw"
			},
			{
				name: "Deactivate",
				value: "deactivate",
			},
			{
				name: "Delegate",
				value: "delegate",
			},
			new Separator(),
			{
				name: "Back",
				value: "back",
			}
		],
		default: "stake",
		loop: false,
		message: "What you desire?",
		pageSize: 5,
	})

	switch (action) {
		case 'withdraw':
			console.log(await staker.withdraw(account.pubkey));
			break;
		case 'deactivate':
			console.log(await staker.deactivate(account.pubkey));
			break;
		case 'delegate':
			const voteKey = await input({
				message: "Which validator?"
			})
			console.log( await staker.delegate(account.pubkey, new PublicKey(voteKey)));
			break;
		default:
			break;
	}
}

async function handle_stake(staker: IStake) {
	const choices = [
		{
			name: "Create New Stake Account",
			value: "newstake",
			description: ""
		},
		{
			name: "See Accounts (" + staker.stakedAccounts().length + ")",
			value: "accounts",
			description: ""
		},
		new Separator(),
		{
			name: "Back",
			value: "back"
		}
	];

	const answer = await select({
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
			await show_stake_accounts(staker);
			break;
		default:
			return
	}
}
