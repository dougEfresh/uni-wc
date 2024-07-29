import {beforeAll, expect} from "@jest/globals";
import {config_from_env, test_init, TestSessions} from "../src";
import {CircleBridge, createBridgeSession} from "@uni-wc/session-cctp";
import {UniversalProviderFactory} from "@uni-wc/provider";
import {TransactionId, wormhole} from "@wormhole-foundation/sdk";
import {PublicKey} from "@solana/web3.js";
import evm from "@wormhole-foundation/sdk/evm";
import solana from "@wormhole-foundation/sdk/solana";

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

	test('evm-evm', async () => {
		const baseSepoliaSession = sessions.baseSepoliaSession;
		const sepoliaSession = sessions.sepoliaSession;
		const baseBridge = createBridgeSession(sessions.ctx, baseSepoliaSession);
		const sepoliaBridge = createBridgeSession(sessions.ctx, sepoliaSession);
		const sigs = await circle.bridge(baseBridge, sepoliaBridge, BigInt(1));
		expect(sigs).toBeDefined();
		sessions.ctx.logger.info(`got back ${JSON.stringify(sigs)}`)
		expect(sigs.length).toEqual(3);
	});


	test('continue-transfer', async () => {
		const eipSession = sessions.baseSepoliaSession;
		const connection = sessions.solSession.connection;
		const signatures = await connection.getSignaturesForAddress(sessions.solSession.account);

		const programId = new PublicKey('CCTPiPYPc6AsJuwueEnWgSgucamXDZwBd53dQ11YiKX3');
		//const solSesssion = sessions.solSession;
		//const wh = await wormhole('Testnet', [evm, solana]);
		//const chainContext = wh.getChain('Solana');
		//const bridge = await chainContext.getCircleBridge()
		const eipBridge = createBridgeSession(sessions.ctx, eipSession);

		for (const { signature } of signatures) {
			const transaction = await connection.getTransaction(signature, {
				commitment: 'finalized'
			});

			if (transaction) {
				const accountKeys = transaction.transaction.message.accountKeys;
				// Check if the programId is involved in the transaction
				if (accountKeys.some(accountKey => accountKey.equals(programId))) {
					console.log(`processing ${signature}`);
					let txid: TransactionId = {
						chain: 'Solana',
						txid: signature,
					};
					const ids = await circle.completeTransfer(txid, eipBridge);
					console.log(ids);
				}
			}
		}

		/*
		const msg = await bridge.parseTransactionDetails("2g1rEWuiHmA3EAje7vnA4qB5YAbbgu5wMkq6qkASjQn4kE9KMYtiJpp82LCv354fqWHc42vrwC6rMhEVJE5Mm8p5");
		expect(msg).toBeDefined();
		expect(msg.id).toBeDefined()
		expect(msg.message).toBeDefined()
		 */

	});

});
