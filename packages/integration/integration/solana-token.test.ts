import {beforeAll, expect} from "@jest/globals";
import {test_init, TestSessions} from "../src";
import {TokenInfo, TokenManagement} from "@uni-wc/session-solana";
import {CircleBridge} from "@uni-wc/session-cctp";
import {UniversalProviderFactory} from "@uni-wc/provider";
import dotenv from "dotenv";
import process from "node:process";
import {CHAINS} from "@uni-wc/chains";
import {PublicKey} from "@solana/web3.js";
import {Wormhole} from "@wormhole-foundation/sdk-connect";


dotenv.config({
	path: "../../.env"
});

for (const envKey in process.env) {
	const chainId = envKey.replace("_", ":");
	const chain = CHAINS.get(chainId);
	if (chain) {
		//console.log("using custom RPC ", process.env[envKey]);
		chain.vchain.rpcUrls["custom"] = {
			http: process.env[envKey]!.split(","),
		};
	}
}


let sessions: TestSessions;
let tokenMang: TokenManagement;
let circle: CircleBridge;

beforeAll(async () => {
	try {
		sessions = await test_init();
		tokenMang = new TokenManagement(sessions.ctx, sessions.solSession, undefined);
		circle =  await CircleBridge.init(sessions.ctx, "Testnet");
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
		const tokens: TokenInfo[] = await tokenMang.tokens();
		expect(tokens.length).toBeGreaterThan(0);
		const usdc = tokens.find((t) => t.info.mint.toString() === "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");
		expect(usdc).toBeDefined();
		const to = new PublicKey("E4SfgGV2v9GLYsEkCQhrrnFbBcYmAiUZZbJ7swKGzZHJ");
		// leave a penny, take a penny
		await tokenMang.transfer(to, usdc!, BigInt(10000));
	});

	test('circle-cctp', async () => {
		const eipSession = sessions.baseSepoliaSession;
		const sigs = await circle.bridgeFromSolana(sessions.solSession, eipSession, BigInt(1));
	});
});
