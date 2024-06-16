import { describe, test, expect } from "@jest/globals"
import {IProvider, RequestParams} from "@walletconnect/universal-provider";
import {SolanaSession} from "./solana";
import {solana} from "@uni-wc/chains";
import {Logger} from "@walletconnect/logger";
import {pino} from "pino";

import {mock, mockReset} from 'jest-mock-extended';
import {IContext} from "../factory";
import bs58 from "bs58";
import {ComputeBudgetProgram, ComputeBudgetInstruction, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import {DryRunModeError} from "./error";

const mockProvider = mock<IProvider>();
const logger: Logger = pino(undefined);

interface MessageResponse {
	signature: string
}
const ctx: IContext = {
	dryRun: true, logger: logger
}
const pk = new PublicKey("GzQ6zxC23F38m3retSWbesi6P3asBDy8iYoGozD9Rqts");
const rando = new Keypair();

beforeEach(() => {
	mockReset(mockProvider);
	mockProvider.requestAccounts.mockReturnValue([pk.toString()])
});

describe('solana', () => {


	test('sign message', async () => {
		const session = new SolanaSession(solana, mockProvider, "blah", ctx);
		const sig: MessageResponse = {
			signature: "4UKY8RnA23uwPGmPRH6DvfgdhCLjCppF1YonEf8J9mnoNSvK8DE2L16PxD7ssakRPds3CYUxgZC4FR2QwSTE6ey5"
		};
		const encoded = bs58.encode(Buffer.from("blah"));
		const args: RequestParams = {
			topic: "blah",
			chainId: solana.id,
			request: {
				method: "solana_signMessage",
				params: {
					message: encoded,
					pubkey: pk.toString()
				}
			}
		};
		mockProvider.request.mockImplementationOnce((req) => {
			if (JSON.stringify(req) === JSON.stringify(args)) {
				return Promise.resolve(sig);
			}
			return Promise.reject(new Error('Unexpected call'));
		});
		const result = await session.signMessage("blah");
		expect(result).toBe(sig.signature);
	})

	test('sign transaction', async () => {
		const session = new SolanaSession(solana, mockProvider, "blah", ctx);
		const sig: MessageResponse = {
			signature: "4UKY8RnA23uwPGmPRH6DvfgdhCLjCppF1YonEf8J9mnoNSvK8DE2L16PxD7ssakRPds3CYUxgZC4FR2QwSTE6ey5"
		};

		const txin = SystemProgram.transfer({
			fromPubkey: pk,
			lamports: 9 * LAMPORTS_PER_SOL,
			toPubkey: rando.publicKey
		});
		const args: RequestParams = {
			topic: "blah",
			chainId: solana.id,
			request: {
				method: "solana_signTransaction",
			}
		};
		mockProvider.request.mockImplementationOnce((req) => {
			if (req.topic != args.topic || req.chainId != args.chainId || req.request.method != args.request.method) {
				return Promise.reject(new Error('Unexpected call\n' + JSON.stringify(req) + '\n' + JSON.stringify(args)));
			}
			if (!req.request.params) {
				return Promise.reject(new Error('No params\n' + JSON.stringify(req) + '\n' + JSON.stringify(args)));
			}
			if (!Object.keys(req.request.params).find((p) => p === "transaction")) {
				return Promise.reject(new Error('No transaction param\n' + JSON.stringify(req) + '\n' + JSON.stringify(args)));
			}
			return Promise.resolve(sig);
		});
		const result = await session.signTransactionFees([txin]);
		expect(result.recentBlockhash).toBeDefined();
		expect(result.recentBlockhash!.length).toBeGreaterThanOrEqual(1);

		expect(result.lastValidBlockHeight).toBeDefined();
		expect(result.lastValidBlockHeight).toBeGreaterThanOrEqual(10000);

		expect(result.instructions.length).toEqual(1);
		expect(result.instructions).toEqual([txin]);

		expect(result.feePayer).toBeDefined()
		expect(result.feePayer).toEqual(pk);
	})

	test('send transaction', async () => {
		const session = new SolanaSession(solana, mockProvider, "blah", ctx);
		const sig: MessageResponse = {
			signature: "4UKY8RnA23uwPGmPRH6DvfgdhCLjCppF1YonEf8J9mnoNSvK8DE2L16PxD7ssakRPds3CYUxgZC4FR2QwSTE6ey5"
		};
		const txin = SystemProgram.transfer({
			fromPubkey: pk,
			lamports: 9 * LAMPORTS_PER_SOL,
			toPubkey: rando.publicKey
		});
		mockProvider.request.mockReturnValue(Promise.resolve(sig));
		let tx: Transaction | undefined = undefined;
		try {
			await session.sendAndConfirm([txin], undefined);
		} catch (e) {
			if (e instanceof DryRunModeError) {
				tx = e.tx;
			} else {
				fail(e);
			}
		}
		expect(tx).toBeDefined();
		expect(tx!.instructions).toBeDefined();
		expect(tx!.instructions.length).toEqual(2);

		const feeInstruction = tx!.instructions[0];
		expect(feeInstruction.programId).toEqual(ComputeBudgetProgram.programId);
		const decoded = ComputeBudgetInstruction.decodeSetComputeUnitPrice(feeInstruction);

		expect(decoded.microLamports).toBeGreaterThanOrEqual(10);
		expect(decoded.microLamports).toBeLessThan(1000);

		const transferInstruction = tx!.instructions[1];
		expect(transferInstruction.programId).toEqual(SystemProgram.programId);
		expect(transferInstruction.keys.length).toEqual(2);
		expect(transferInstruction.keys[0].pubkey).toEqual(pk);
		expect(transferInstruction.keys[0].isSigner).toBeTruthy();
		expect(transferInstruction.keys[1].pubkey).toEqual(rando.publicKey);
	});

});
