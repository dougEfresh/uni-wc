import {PublicKey, Transaction} from "@solana/web3.js";

export class DryRunModeError extends Error {
	public tx?: Transaction
	constructor(tx?: Transaction) {
		if (tx) {
			const msg = tx.instructions.map((i) => JSON.stringify(i)).join("\n");
			super(`DRY RUN MODE\n${msg}`);
		} else {
			super("DRY RUN MODE");
		}
		this.tx = tx;
		this.name = "DryRunModeError";
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, DryRunModeError);
		}
	}
}

