import {
	Chain, 	network, Wormhole,
} from '@wormhole-foundation/sdk-connect';
import {IContext, IEipSession, ISolanaSession} from "@uni-wc/provider";

import evm from "@wormhole-foundation/sdk/evm";
import solana from "@wormhole-foundation/sdk/solana";
import cosmwasm from "@wormhole-foundation/sdk/cosmwasm";
import {wormhole} from "@wormhole-foundation/sdk";
import {Logger} from "pino";
import {EipWormholeSigner, SolanaWormholeSigner} from "./signers";

import {solana as cSolana, baseSepolia as cBaseSepolia} from '@uni-wc/chains';


const chainToWormhole =  (k: string): Chain => {
	switch (k) {
		case cSolana.id:
			return 'Solana';
		case cBaseSepolia.id:
			return 'BaseSepolia';
		default:
			throw new Error(`unable to lookup chain  from id ${k}`);
	}
};

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

	public async bridgeEvm(from: IEipSession, to: IEipSession,  amt: bigint): Promise<string[]> {
		const fromChain = chainToWormhole(from.chain.id);
		const destChain = chainToWormhole(to.chain.id);
		const id : string[] = [];
		const destSigner = new EipWormholeSigner(this.ctx, to);
		const fromSigner = new EipWormholeSigner(this.ctx, from);
		const toAddress = Wormhole.chainAddress(destChain, to.account);
		const sender = Wormhole.chainAddress(fromChain, from.account);
		const xfer = await this.wh.circleTransfer(amt, sender, toAddress, false);
		const srcTxids = await xfer.initiateTransfer(fromSigner);
		id.push(...srcTxids);
		const timeout = 60 * 1000;
		const attestIds = await xfer.fetchAttestation(timeout);
		id.push(...attestIds);
		const destTx = await xfer.completeTransfer(destSigner);
		id.push(...destTx);
		return id;
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
