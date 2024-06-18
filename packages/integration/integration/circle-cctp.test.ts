import {beforeAll, expect} from "@jest/globals";
import {config_from_env, test_init, TestSessions} from "../src";
import {CircleBridge} from "@uni-wc/session-cctp";
import {UniversalProviderFactory} from "@uni-wc/provider";
config_from_env();
let sessions: TestSessions;
let circle: CircleBridge;

beforeAll(async () => {
	sessions = await test_init();
	circle =  await CircleBridge.init(sessions.ctx, "Testnet");
}, 30000);

afterAll(async () => {
	try {
		await UniversalProviderFactory.close();
	} catch (e) {
		console.error(e);
	}
}, 5000);

describe('circle-cctp', () => {
	test('solana-evm', async () => {
		const eipSession = sessions.baseSepoliaSession;
		const sigs = await circle.bridgeFromSolana(sessions.solSession, eipSession, BigInt(1));
		expect(sigs).toBeDefined();
		sessions.ctx.logger.info(`got back ${JSON.stringify(sigs)}`)
		expect(sigs.length).toEqual(3);
	});

	test('polygon-base', async () => {
		const eipSession = sessions.sepoliaSession;
		const sigs = await circle.bridgeEvm(eipSession, sessions.baseSepoliaSession , BigInt(1));
		expect(sigs).toBeDefined();
		expect(sigs.length).toEqual(3);
	});
});
