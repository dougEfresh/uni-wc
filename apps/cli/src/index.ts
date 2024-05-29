import { main } from './main.js';
import {program} from "commander";

import dotenv from 'dotenv';
import * as process from "node:process";

dotenv.config();

program
	.option('--fireblocks <vaultId>', 'Enable Fireblocks and connect to this vaultId', parseFloat, -1)
	.option('--testnet', 'Use testnet instead of mainnet', false)
	.option('--log-level <level>', 'debug|info|warn|error', "warn")
	.parse(process.argv);

await main()
