import {beforeAll, expect} from "@jest/globals";
import {config_from_env, test_init, TestSessions} from "../src";
import {UniversalProviderFactory} from "@uni-wc/provider";
import {Address, getContract, parseUnits} from "viem";

config_from_env();
let sessions: TestSessions;


beforeAll(async () => {
	sessions = await test_init();
}, 30000);

afterAll(async () => {
	try {
		await UniversalProviderFactory.close();
	} catch (e) {
		console.error(e);
	}
}, 5000);

const abi = [{
	"constant": true,
	"inputs": [],
	"name": "name",
	"outputs": [{"name": "", "type": "string"}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{"name": "spender", "type": "address"}, {"name": "tokens", "type": "uint256"}],
	"name": "approve",
	"outputs": [{"name": "success", "type": "bool"}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "totalSupply",
	"outputs": [{"name": "", "type": "uint256"}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{"name": "from", "type": "address"}, {"name": "to", "type": "address"}, {
		"name": "tokens",
		"type": "uint256"
	}],
	"name": "transferFrom",
	"outputs": [{"name": "success", "type": "bool"}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "decimals",
	"outputs": [{"name": "", "type": "uint8"}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{"name": "tokenOwner", "type": "address"}],
	"name": "balanceOf",
	"outputs": [{"name": "balance", "type": "uint256"}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "acceptOwnership",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "owner",
	"outputs": [{"name": "", "type": "address"}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "symbol",
	"outputs": [{"name": "", "type": "string"}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [],
	"name": "drip",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{"name": "to", "type": "address"}, {"name": "tokens", "type": "uint256"}],
	"name": "transfer",
	"outputs": [{"name": "success", "type": "bool"}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{"name": "spender", "type": "address"}, {"name": "tokens", "type": "uint256"}, {
		"name": "data",
		"type": "bytes"
	}],
	"name": "approveAndCall",
	"outputs": [{"name": "success", "type": "bool"}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [],
	"name": "newOwner",
	"outputs": [{"name": "", "type": "address"}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{"name": "tokenAddress", "type": "address"}, {"name": "tokens", "type": "uint256"}],
	"name": "transferAnyERC20Token",
	"outputs": [{"name": "success", "type": "bool"}],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"constant": true,
	"inputs": [{"name": "tokenOwner", "type": "address"}, {"name": "spender", "type": "address"}],
	"name": "allowance",
	"outputs": [{"name": "remaining", "type": "uint256"}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
}, {
	"constant": false,
	"inputs": [{"name": "_newOwner", "type": "address"}],
	"name": "transferOwnership",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
	"payable": true,
	"stateMutability": "payable",
	"type": "fallback"
}, {
	"anonymous": false,
	"inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
		"indexed": true,
		"name": "_to",
		"type": "address"
	}],
	"name": "OwnershipTransferred",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{"indexed": true, "name": "from", "type": "address"}, {
		"indexed": true,
		"name": "to",
		"type": "address"
	}, {"indexed": false, "name": "tokens", "type": "uint256"}],
	"name": "Transfer",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{"indexed": true, "name": "tokenOwner", "type": "address"}, {
		"indexed": true,
		"name": "spender",
		"type": "address"
	}, {"indexed": false, "name": "tokens", "type": "uint256"}],
	"name": "Approval",
	"type": "event"
}];

function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

describe('evm', () => {
	test('usdc', async () => {
		const pc = sessions.baseSepoliaSession.pc;
		const balance = await pc.getBalance({
			address: sessions.baseSepoliaSession.account,
		});
		console.log(`balance ${balance}`);
		const wc = sessions.baseSepoliaSession.wc;
		await wc.switchChain({
			id: sessions.baseSepoliaSession.chain.vchain.id
		});
		const contract = getContract({
			abi: abi,
			client: {
				public: pc,
				wallet: wc,
			},
			address:  "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as Address,
		}
		)
		const totalSupply = await contract.read.totalSupply();
		expect(totalSupply).toBeDefined();
		expect(totalSupply).toBeGreaterThan(0);
		const amt = parseUnits("0.000001", 6);
		const hash = await contract.write.transfer(['0x3d69528383409EA07A8d68a9777cEaFC574D84b4',amt]);
		await sleep(7000);
		const status = await pc.getTransaction({
			hash: hash,
		});

		expect(status).toBeDefined();
	});

});
