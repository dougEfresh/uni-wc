import dotenv from 'dotenv';
import {beforeAll, expect} from "@jest/globals";
import {UniversalProviderFactory} from "@uni-wc/provider";
import {Keypair, LAMPORTS_PER_SOL, PublicKey, StakeProgram, SystemProgram} from "@solana/web3.js";
import {test_init, TestSessions} from "../src";
import {Stake as SolStatke} from "@uni-wc/session-solana";

dotenv.config({
	path: "../../.env"
});


let sessions: TestSessions;
let solStaker: SolStatke;

beforeAll(async () => {
	try {
		sessions = await test_init();
		solStaker = await SolStatke.init(sessions.solSession, sessions.ctx);
	} catch (e) {
		console.error(e);
	}
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
		await solSession!.signMessage(new Date().toDateString());
	})

	test('transaction', async () => {
		const solSession = sessions.solSession;
		const to = new PublicKey("HjNrrvRgpQzQsgz3HMdBNVDSnDkstQELMmTuw7iT41Jn");
		const instruction = SystemProgram.transfer({
			lamports: 0.0001 * LAMPORTS_PER_SOL,
			fromPubkey: solSession.account,
			toPubkey: to,
		})
		const tx = await solSession.signTransaction([instruction]);
		expect(tx.verifySignatures(true)).toBeTruthy();
	});

	test('send', async () => {
		const solSession = sessions.solSession;
		const to = new PublicKey("HjNrrvRgpQzQsgz3HMdBNVDSnDkstQELMmTuw7iT41Jn");
		const instruction = SystemProgram.transfer({
			lamports: 0.0001 * LAMPORTS_PER_SOL,
			fromPubkey: solSession.account,
			toPubkey: to,
		})
		const tx = await solSession.sendAndConfirm([instruction], undefined);
		expect(tx.length).toBeGreaterThanOrEqual(80);
	});

});


describe('solana-stake', () => {
	test('create', async () => {
		const rando = new Keypair();
		const sig  = await solStaker.stake(0.7 * LAMPORTS_PER_SOL, rando );
		expect(sig.length).toBeGreaterThanOrEqual(40);
		const acct = solStaker.stakedAccounts().find((a) => a.pubkey.toString() === rando.publicKey.toString());
		expect(acct).toBeDefined();
		expect(acct!.pubkey.toString()).toEqual(rando.publicKey.toString());
	});

	test('withdrawal', async () => {
		if (solStaker.stakedAccounts().length == 0) {
			console.warn("no accounts to withdrawal from")
			return;
		}
		let size = solStaker.stakedAccounts().length - 1;
		const removed = solStaker.stakedAccounts()[0];
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
