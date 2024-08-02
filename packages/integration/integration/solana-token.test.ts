import {beforeAll, expect} from "@jest/globals";
import {config_from_env, test_init, TestSessions} from "../src";
import {TokenInfo, TokenManagement} from "@uni-wc/session-solana";
import {UniversalProviderFactory} from "@uni-wc/provider";
import {PublicKey} from "@solana/web3.js";

/*
config_from_env();

let sessions: TestSessions;
let tokenMang: TokenManagement;

beforeAll(async () => {
		sessions = await test_init();
		tokenMang = new TokenManagement(sessions.ctx, sessions.solSession, undefined);
}, 30000);

afterAll(async () => {
	try {
		await UniversalProviderFactory.close();
	} catch (e) {
		console.error(e);
	}
}, 5000);

describe('solana-tokens', () => {
	test('send', async () => {
		const tokens: TokenInfo[] = await tokenMang.tokens();
		expect(tokens.length).toBeGreaterThan(0);
		const usdc = tokens.find((t) => t.info.mint.toString() === "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");
		expect(usdc).toBeDefined();
		const to = new PublicKey("E4SfgGV2v9GLYsEkCQhrrnFbBcYmAiUZZbJ7swKGzZHJ");
		// leave a penny, take a penny
		await tokenMang.transfer(to, usdc!, BigInt(10000));
	});
});

 */
