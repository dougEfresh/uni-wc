import {beforeAll, expect} from "@jest/globals";
import {test_init, TestSessions} from "../src";
import {TokenManagement} from "@uni-wc/session-solana";
import {UniversalProviderFactory} from "@uni-wc/provider";
import dotenv from "dotenv";
import {TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import process from "node:process";
import {CHAINS} from "@uni-wc/chains";

dotenv.config({
	path: "../../.env"
});

for (const envKey in process.env) {
	const chainId = envKey.replace("_", ":");
	const chain = CHAINS.get(chainId);
	if (chain) {
		console.log("using custom RPC ", process.env[envKey]);
		chain.vchain.rpcUrls["custom"] = {
			http: process.env[envKey]!.split(","),
		};
	}
}


let sessions: TestSessions;
let tokenMang: TokenManagement;

beforeAll(async () => {
	try {
		sessions = await test_init();
		tokenMang = await TokenManagement.init(sessions.solSession, sessions.ctx);
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

describe('solana-tokens', () => {
	test('send', async () => {
		expect(tokenMang.tokens(TOKEN_PROGRAM_ID).length).toBeGreaterThan(0);
	});
});


