import {
	Chain, ChainAddress, CircleTransfer, network, SignAndSendSigner, TransactionId, Wormhole,
} from '@wormhole-foundation/sdk-connect';
import {EipSession, IContext, IEipSession, ISolanaSession, SolanaSession} from "@uni-wc/provider";

import evm from "@wormhole-foundation/sdk/evm";
import solana from "@wormhole-foundation/sdk/solana";
import cosmwasm from "@wormhole-foundation/sdk/cosmwasm";
import {wormhole} from "@wormhole-foundation/sdk";
import {Logger} from "pino";
import {EipWormholeSigner, SolanaWormholeSigner} from "./signers";

import {solana  as cSolana, solanadev as cSolanadev , baseSepolia , sepolia} from '@uni-wc/chains';


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

const chainToWormhole =  (k: string): Chain => {
	switch (k) {
		case cSolana.id:
			return 'Solana'
		case cSolanadev.id:
			return 'Solana'
		case baseSepolia.id:
			return 'BaseSepolia';
		case sepolia.id:
			return 'Sepolia';
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
		const wh = await wormhole(net, [evm, solana, cosmwasm], {
			chains: {
				Solana: {
					rpc: "https://devnet.helius-rpc.com/?api-key=4cea6a19-c670-44a2-b41b-1d20193e62b0"
				}
			}
		});
		return new CircleBridge(ctx,  wh);
	}

	public async burn(from: BridgeSession<any>, dest: BridgeSession<any>,  amt: bigint): Promise<{ xfer: CircleTransfer<any>, id: string}> {
		const fromSigner = from.signer;
		const xfer = await this.wh.circleTransfer(amt, from.address, dest.address, false);
		const ids =  await xfer.initiateTransfer(fromSigner);

		if (ids.length == 0) {
			throw new Error("Did not get back transaction hash for burn contract call");
		}
		return {xfer, id: ids[0]};
	}

	public async completeXfer<C extends Chain>(xfer: CircleTransfer<any>, dest: BridgeSession<C>): Promise<string[]> {
		const ids: string[] = [];
		const attestIds = await xfer.fetchAttestation(60 * 1000);
		ids.push(...attestIds);
		const dstTxIds = await xfer.completeTransfer(dest.signer);
		ids.push(...dstTxIds);
		return ids;
	}

	public async completeTransfer<C extends Chain>(txid: TransactionId, dest: BridgeSession<C>): Promise<string[]> {
		const ids: string[] = [];

		const xfer = await CircleTransfer.from(this.wh, txid);
		const attestIds = await xfer.fetchAttestation(60 * 1000);
		ids.push(...attestIds);
		const dstTxIds = await xfer.completeTransfer(dest.signer);
		ids.push(...dstTxIds);
		return ids;
	}

	public async bridge(from: BridgeSession<any>, dest: BridgeSession<any>,  amt: bigint): Promise<string[]> {
		const {
			xfer,
			id
		} = await this.burn(from, dest, amt);
		const ids : string[] = [id];
		const sigs = await this.completeXfer(xfer, dest);
		ids.push(...sigs);
		return ids;
	}

	public async bridgeFromSolana(from: ISolanaSession, to: IEipSession,  amt: bigint): Promise<string[]> {
		const destChain = chainToWormhole(to.chain.id);
		const id: string[]  = [];
		const solSigner = new SolanaWormholeSigner(this.ctx, from);
		const eipSigner = new EipWormholeSigner(this.ctx, to);
		const toAddress = Wormhole.chainAddress(destChain, to.account);
		const sender = Wormhole.chainAddress('Solana', from.account.toString());
		const xfer = await this.wh.circleTransfer(amt, sender, toAddress, false);
		const srcTxids = await xfer.initiateTransfer(solSigner);
		id.push(...srcTxids);
		const timeout = 60 * 1000;
		this.logger.info("Checking circle attestation");
		const attestIds = await xfer.fetchAttestation(timeout);
		id.push(...attestIds);
		this.logger.info(`Got Attestation: ${JSON.stringify(attestIds)}`);
		const destTx = await xfer.completeTransfer(eipSigner);
		id.push(...destTx);
		this.logger.info(`Destination chain sigs ${JSON.stringify(destTx)}`);
		return id;
	}
}
