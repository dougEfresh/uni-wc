import {
	Chain,
	ChainAddress,
	CircleTransfer,
	network,
	SignAndSendSigner,
	TransactionId,
	TransferState,
	Wormhole,
	wormhole,
} from '@wormhole-foundation/sdk';
import {EipSession, IContext, IEipSession, ISolanaSession, SolanaSession} from "@uni-wc/provider";

import evm from "@wormhole-foundation/sdk/evm";
import solana from "@wormhole-foundation/sdk/solana";
import cosmwasm from "@wormhole-foundation/sdk/cosmwasm";
import {Logger} from "pino";
import {EipWormholeSigner, SolanaWormholeSigner} from "./signers";

import {baseSepolia, optimismSepolia, sepolia, solana as cSolana, solanadev as cSolanadev} from '@uni-wc/chains';


export function createBridgeSession(ctx: IContext, session: IEipSession | ISolanaSession): BridgeSession<any> {
	const c = chainToWormhole(session.chain.id);
	if (session instanceof EipSession) {
		return {
			address:  Wormhole.chainAddress(c, session.account),
			signer: new EipWormholeSigner(ctx, session)
		}
	}

	if (session instanceof SolanaSession) {
		return {
			address: Wormhole.chainAddress(c, session.account.toString()),
			signer: new SolanaWormholeSigner(ctx, session),
		}
	}

	throw new Error(`Unknown session ${typeof session}`)
}

export const chainToWormhole =  (k: string): Chain => {
	switch (k) {
		case cSolana.id:
			return 'Solana'
		case cSolanadev.id:
			return 'Solana'
		case baseSepolia.id:
			return 'BaseSepolia';
		case sepolia.id:
			return 'Sepolia';
		case optimismSepolia.id:
			return 'OptimismSepolia'
		default:
			throw new Error(`unable to lookup chain  from id ${k}`);
	}
};

export interface BridgeSession<C extends Chain> {
	signer: SignAndSendSigner<any, C>
	address: ChainAddress<C>
}

export class CircleBridge  {
	readonly wh:  Wormhole<any>;
	readonly logger: Logger
	readonly ctx: IContext;

	constructor(ctx: IContext, wh: Wormhole<any>) {
		this.wh = wh;
		this.logger = ctx.logger.child({context: "circle-cctp"});
		this.ctx = ctx;
	}

	public static async init (ctx: IContext,  net: network.Network) {
		const wh = await wormhole(net, [evm, solana, cosmwasm]);
		return new CircleBridge(ctx,  wh);
	}


	public async completeTransfer<C extends Chain>(txid: TransactionId, dest: BridgeSession<C>): Promise<string[]> {
		const xfer = await CircleTransfer.from(this.wh, txid );
		if (xfer.getTransferState() == TransferState.DestinationFinalized) {
			return [];
		}
		const ids = await xfer.fetchAttestation(60 * 1000);
		this.logger.info(`got back attestation ids ${ids}`);
		return xfer.completeTransfer(dest.signer);
	}

	public async bridge(from: BridgeSession<any>, dest: BridgeSession<any>,  amt: bigint): Promise<string[]> {
		const fromSigner = from.signer;
		const xfer = await this.wh.circleTransfer(amt, from.address, dest.address, false);
		const ids =  await xfer.initiateTransfer(fromSigner);
		const attestIds = await xfer.fetchAttestation(60 * 1000);
		const destIds = await xfer.completeTransfer(dest.signer);
		ids.push(...attestIds);
		ids.push(...destIds);
		return ids;
	}
}
