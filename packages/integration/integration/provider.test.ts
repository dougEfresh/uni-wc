import dotenv from 'dotenv';
import {beforeAll, expect} from "@jest/globals";
import {UniversalProviderFactory} from "@uni-wc/provider";
import {LAMPORTS_PER_SOL, PublicKey, SystemProgram} from "@solana/web3.js";
import {test_init, TestSessions} from "../src";

dotenv.config({
	path: "../../.env"
});


let sessions: TestSessions;

beforeAll(async () => {
	try {
		sessions = await test_init();
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

describe('solana sign', () => {
	test('solana sign message', async () => {
		const solSession = sessions.solSession;
		expect(solSession).toBeDefined();
		await solSession!.signMessage(new Date().toDateString());
	})

	test('solana sign transaction', async () => {
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

	test('solana send', async () => {
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

