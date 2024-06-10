import { main } from './main';
import {program} from "commander";
import { CHAINS } from '@uni-wc/chains'

import dotenv from 'dotenv';
import * as process from "node:process";

dotenv.config();

for (const envKey in process.env) {
	const chainId = envKey.replace("_", ":");
	const chain = CHAINS.get(chainId);
	if (chain) {
		console.log("using custom RPC ", process.env[envKey]);
		chain.vchain.rpcUrls["custom"] = {
			http: process.env[envKey]!.split(","),
		};
	}
}


program
	.option('--fireblocks <vaultId>', 'Enable Fireblocks and connect to this vaultId', parseFloat, -1)
	.option('--testnet', 'Use testnet instead of mainnet', false)
	.option('--dry-run', 'dry run mode (do not send)', false)
	.option('--log-level <level>', 'debug|info|warn|error', "warn")
	.parse(process.argv);

await main()
