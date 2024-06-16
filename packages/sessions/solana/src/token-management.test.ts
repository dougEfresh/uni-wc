import {IContext, ISolanaSession} from "@uni-wc/provider";
import {Connection, Keypair, PublicKey, TransactionInstruction} from "@solana/web3.js";
import {Logger, pino} from "@walletconnect/logger";
import {mock, mockReset} from 'jest-mock-extended';
import {describe, expect, test} from "@jest/globals";
import {TokenManagement} from "./token-management";
import {solana} from "@uni-wc/chains";
import {
	createTransferInstruction,
	getAssociatedTokenAddressSync,
	TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const mockSession = mock<ISolanaSession>();
const logger: Logger = pino(undefined);

const ctx: IContext = {
	dryRun: true, logger: logger
}
const toly = new PublicKey("86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY");
const rando = new Keypair();

beforeEach(() => {
	mockReset(mockSession);
	mockSession.account = toly;
	mockSession.connection = new Connection(solana.vchain.rpcUrls["default"].http[0]);
	mockSession.chain = solana;

		//mockProvider.requestAccounts.mockReturnValue([pk.toString()])
});

describe('solana-token-manager', () => {
	test('transfer-no-account', async () => {
			const tokenManager =  new TokenManagement(ctx, mockSession, undefined);
			const to: PublicKey = new PublicKey("E4SfgGV2v9GLYsEkCQhrrnFbBcYmAiUZZbJ7swKGzZHJ");
			const usdc = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
			const tokens = await tokenManager.tokens();
			expect(tokens.length).toBeGreaterThan(0);
			const ownerAccount = tokens.find((t) => t.info.mint.equals(usdc));
			expect(ownerAccount).toBeDefined();
			const senderAccount = getAssociatedTokenAddressSync(usdc, to, false, TOKEN_PROGRAM_ID);
		let txin: TransactionInstruction[] = [];
		mockSession.sendAndConfirm.mockImplementationOnce((req) => {
			txin = req;
			return Promise.resolve("sig");
		});
		// Hmzk5ohDH7DmZkAboxwihNFxMB91Dhu45iyBqqm3s7Db
		const sig = await tokenManager.transfer(to, ownerAccount!, BigInt(1));
		expect(txin.length).toEqual(1);
		expect(sig).toEqual("sig");
		}
	)

		test('transfer-create-account', async () => {
			// @ts-ignore
			const tokenManager = await TokenManagement.init(mockSession, ctx);
			const tokens = tokenManager.tokens(TOKEN_PROGRAM_ID);
			expect(tokens.length).toBeGreaterThan(0);
			const transfer = tokens[0];
			const senderAccount = getAssociatedTokenAddressSync(transfer.account.mint, rando.publicKey, false, TOKEN_PROGRAM_ID);
			const args : TransactionInstruction = createTransferInstruction(transfer.tokenAccount, senderAccount, toly, 1, undefined, TOKEN_PROGRAM_ID);
			let txin: TransactionInstruction[] = [];
			mockSession.sendAndConfirm.mockImplementationOnce((req) => {
				txin = req;
				return Promise.resolve("sig");
			});
			// Hmzk5ohDH7DmZkAboxwihNFxMB91Dhu45iyBqqm3s7Db
			await tokenManager.transfer(rando.publicKey, transfer, TOKEN_PROGRAM_ID, 1);
			expect(txin.length).toEqual(2);
			expect(txin[1]).toEqual(args);
			}
		)
	}
);
