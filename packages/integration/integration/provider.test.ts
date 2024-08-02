import {beforeAll, expect} from "@jest/globals";
import {UniversalProviderFactory} from "@uni-wc/provider";
import {Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram} from "@solana/web3.js";
import {config_from_env, test_init, TestSessions} from "../src";
import {Stake as SolStatke, TransactionSession as SolTransaction } from "@uni-wc/session-solana";

/*
config_from_env();

let sessions: TestSessions;
let solStaker: SolStatke;
let solTransaction: SolTransaction;

beforeAll(async () => {
	sessions = await test_init();
	solStaker = await SolStatke.init(sessions.solSession, sessions.ctx);
	solTransaction = new SolTransaction(sessions.solSession);
}, 30000);

afterAll(async () => {
	try {
		await UniversalProviderFactory.close();
	} catch (e) {
		console.error(e);
	}
}, 5000);

describe('solana-sign', () => {
	test('message', async () => {
		const solSession = sessions.solSession;
		expect(solSession).toBeDefined();
		const sig = await solSession!.signMessage(new Date().toDateString());
		expect(sig).toBeDefined();
	})

	test('transaction', async () => {
		const solSession = sessions.solSession;
		expect(solSession).toBeDefined();
		const to = new PublicKey("HjNrrvRgpQzQsgz3HMdBNVDSnDkstQELMmTuw7iT41Jn");
		const instruction = SystemProgram.transfer({
			lamports: 0.0001 * LAMPORTS_PER_SOL,
			fromPubkey: solSession!.account,
			toPubkey: to,
		})
		const tx = await solSession!.signTransactionFees([instruction]);
		expect(tx.verifySignatures(true)).toBeTruthy();
	});

	test('send', async () => {
		const solSession = sessions.solSession;
		expect(solSession).toBeDefined();
		const to = new PublicKey("HjNrrvRgpQzQsgz3HMdBNVDSnDkstQELMmTuw7iT41Jn");
		const instruction = SystemProgram.transfer({
			lamports: 0.0001 * LAMPORTS_PER_SOL,
			fromPubkey: solSession!.account,
			toPubkey: to,
		})
		const tx = await solSession!.sendAndConfirm([instruction], undefined);
		expect(tx.length).toBeGreaterThanOrEqual(80);
	});

});


describe('solana-transactions', () => {
	test('send', async () => {
		const to = new PublicKey("HjNrrvRgpQzQsgz3HMdBNVDSnDkstQELMmTuw7iT41Jn");
		const sig = await solTransaction.send(to, 0.00001 * LAMPORTS_PER_SOL);
		const block = await sessions.solSession!.connection.getLatestBlockhash();
		const status = await sessions.solSession!.connection.confirmTransaction({
			signature: sig,
			blockhash: block.blockhash,
			lastValidBlockHeight: block.lastValidBlockHeight
		}, "finalized");
		expect(status).toBeDefined();
		expect(status.value).not.toBeNull();
		expect(status.value).toBeDefined();
		expect(status.value!.err).toBeNull();
	});
});

describe('solana-stake', () => {
	test('create', async () => {
		const rando = new Keypair();
		const sig  = await solStaker.stake(1.1 * LAMPORTS_PER_SOL, rando );
		expect(sig.length).toBeGreaterThanOrEqual(40);
		const acct = solStaker.stakedAccounts().find((a) => a.pubkey.toString() === rando.publicKey.toString());
		expect(acct).toBeDefined();
		expect(acct!.pubkey.toString()).toEqual(rando.publicKey.toString());
	});

	test('withdrawal', async () => {
		if (solStaker.stakedAccounts().length == 0) {
			console.warn("no accounts to withdrawal from");
			return;
		}
		let size = solStaker.stakedAccounts().length - 1;
		const removed = solStaker.stakedAccounts().find((a) => a.account.lamports > LAMPORTS_PER_SOL);
		if (!removed) {
			console.warn("no accounts above 1 SOL to remove");
			return;
		}
		await solStaker.withdraw(removed.pubkey);
		expect(solStaker.stakedAccounts().length).toEqual(size);
		const exists = solStaker.stakedAccounts().find((a)  => a.pubkey.toString() === removed.pubkey.toString());
		expect(exists).toBeUndefined();
	});


	test('delegate', async () => {
		if (solStaker.stakedAccounts().length == 0) {
			console.warn("no accounts to delegate")
			return;
		}
		const voteAccout = new PublicKey("vgcDar2pryHvMgPkKaZfh8pQy4BJxv7SpwUG7zinWjG");
		const acct = solStaker.stakedAccounts()[0];
		await solStaker.delegate(acct.pubkey, voteAccout);
	});

});


 */
