import {beforeAll, expect} from "@jest/globals";
import {config_from_env, test_init, TestSessions} from "../src";
import {CircleBridge, createBridgeSession} from "@uni-wc/session-cctp";
import {UniversalProviderFactory} from "@uni-wc/provider";
import exp = require("node:constants");
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
		const eipBridge = createBridgeSession(sessions.ctx, eipSession);
		const solanaBridge = createBridgeSession(sessions.ctx, sessions.solSession);
		const sigs = await circle.bridge(solanaBridge, eipBridge, BigInt(1));
		expect(sigs).toBeDefined();
		sessions.ctx.logger.info(`got back ${JSON.stringify(sigs)}`)
		expect(sigs.length).toEqual(3);
	});


	test('continue-transfer', async () => {
		const eipSession = sessions.baseSepoliaSession;
		const eipBridge = createBridgeSession(sessions.ctx, eipSession);
		const solanaBridge = createBridgeSession(sessions.ctx, sessions.solSession);
		const {
			xfer,
			id
		} = await circle.burn(solanaBridge, eipBridge, BigInt(1));
		expect(id).toBeDefined();
		console.log(JSON.stringify(Object.keys(xfer)));

		const hash = await sessions.solSession.connection.getLatestBlockhash();
		const status = await sessions.solSession.connection.confirmTransaction({
			signature: id,
			blockhash: hash.blockhash,
			lastValidBlockHeight: hash.lastValidBlockHeight
		}, "finalized");
		expect(status.value).toBeDefined();
		const sigs = await circle.completeTransfer(xfer.txids[0] , eipBridge);
		expect(sigs).toBeDefined();
		sessions.ctx.logger.info(`got back ${JSON.stringify(sigs)}`)
		expect(sigs.length).toEqual(2);
	});

	/*
	test('evm-evm', async () => {
		const sigs = await circle.bridgeEvm(sessions.baseSepoliaSession , sessions.sepoliaSession, BigInt(1));
		expect(sigs).toBeDefined();
		expect(sigs.length).toEqual(3);
	});

	test('evm-evm', async () => {
		const sigs = await circle.bridgeEvm(sessions.baseSepoliaSession , sessions.sepoliaSession, BigInt(1));
		expect(sigs).toBeDefined();
		expect(sigs.length).toEqual(3);
	});
	 */
});
