import type {Chain} from "./chain";
import {solana, solanadev} from "./solana";
import {cosmos} from "./cosmos";

import {acala} from './eip155/acala'
import {ancient8Sepolia} from './eip155/ancient8Sepolia'
import {ancient8} from './eip155/ancient8'
import {anvil} from './eip155/anvil'
import {apexTestnet} from './eip155/apexTestnet'
import {arbitrumGoerli} from './eip155/arbitrumGoerli'
import {arbitrumNova} from './eip155/arbitrumNova'
import {arbitrumSepolia} from './eip155/arbitrumSepolia'
import {arbitrum} from './eip155/arbitrum'
import {areonNetworkTestnet} from './eip155/areonNetworkTestnet'
import {areonNetwork} from './eip155/areonNetwork'
import {astar} from './eip155/astar'
import {astarZkEVM} from './eip155/astarZkEVM'
import {astarZkyoto} from './eip155/astarZkyoto'
import {auroraTestnet} from './eip155/auroraTestnet'
import {aurora} from './eip155/aurora'
import {auroria} from './eip155/auroria'
import {avalancheFuji} from './eip155/avalancheFuji'
import {avalanche} from './eip155/avalanche'
import {bahamut} from './eip155/bahamut'
import {baseGoerli} from './eip155/baseGoerli'
import {baseSepolia} from './eip155/baseSepolia'
import {base} from './eip155/base'
import {beamTestnet} from './eip155/beamTestnet'
import {beam} from './eip155/beam'
import {bearNetworkChainMainnet} from './eip155/bearNetworkChainMainnet'
import {bearNetworkChainTestnet} from './eip155/bearNetworkChainTestnet'
import {berachainTestnet} from './eip155/berachainTestnet'
import {bevmMainnet} from './eip155/bevmMainnet'
import {bitTorrentTestnet} from './eip155/bitTorrentTestnet'
import {bitTorrent} from './eip155/bitTorrent'
import {blastSepolia} from './eip155/blastSepolia'
import {blast} from './eip155/blast'
import {boba} from './eip155/boba'
import {bob} from './eip155/bob'
import {bronosTestnet} from './eip155/bronosTestnet'
import {bronos} from './eip155/bronos'
import {bscGreenfield} from './eip155/bscGreenfield'
import {bscTestnet} from './eip155/bscTestnet'
import {bsc} from './eip155/bsc'
import {btrTestnet} from './eip155/btrTestnet'
import {btr} from './eip155/btr'
import {bxnTestnet} from './eip155/bxnTestnet'
import {bxn} from './eip155/bxn'
import {canto} from './eip155/canto'
import {celoAlfajores} from './eip155/celoAlfajores'
import {celo} from './eip155/celo'
import {chiliz} from './eip155/chiliz'
import {classic} from './eip155/classic'
import {confluxESpaceTestnet} from './eip155/confluxESpaceTestnet'
import {confluxESpace} from './eip155/confluxESpace'
import {coreDao} from './eip155/coreDao'
import {cronosTestnet} from './eip155/cronosTestnet'
import {cronos} from './eip155/cronos'
import {crossbell} from './eip155/crossbell'
import {cyberTestnet} from './eip155/cyberTestnet'
import {cyber} from './eip155/cyber'
import {darwinia} from './eip155/darwinia'
import {defichainEvmTestnet} from './eip155/defichainEvmTestnet'
import {defichainEvm} from './eip155/defichainEvm'
import {degen} from './eip155/degen'
import {dfk} from './eip155/dfk'
import {dodochainTestnet} from './eip155/dodochainTestnet'
import {dogechain} from './eip155/dogechain'
import {dreyerxMainnet} from './eip155/dreyerxMainnet'
import {edgelessTestnet} from './eip155/edgelessTestnet'
import {edgeless} from './eip155/edgeless'
import {edgewareTestnet} from './eip155/edgewareTestnet'
import {edgeware} from './eip155/edgeware'
import {ektaTestnet} from './eip155/ektaTestnet'
import {ekta} from './eip155/ekta'
import {eon} from './eip155/eon'
import {eosTestnet} from './eip155/eosTestnet'
import {eos} from './eip155/eos'
import {etherlinkTestnet} from './eip155/etherlinkTestnet'
import {eth} from './eip155/eth'
import {evmosTestnet} from './eip155/evmosTestnet'
import {evmos} from './eip155/evmos'
import {fantomSonicTestnet} from './eip155/fantomSonicTestnet'
import {fantomTestnet} from './eip155/fantomTestnet'
import {fantom} from './eip155/fantom'
import {fibo} from './eip155/fibo'
import {filecoinCalibration} from './eip155/filecoinCalibration'
import {filecoinHyperspace} from './eip155/filecoinHyperspace'
import {filecoin} from './eip155/filecoin'
import {flareTestnet} from './eip155/flareTestnet'
import {flare} from './eip155/flare'
import {flowMainnet} from './eip155/flowMainnet'
import {flowPreviewnet} from './eip155/flowPreviewnet'
import {flowTestnet} from './eip155/flowTestnet'
import {foundry} from './eip155/foundry'
import {fraxtalTestnet} from './eip155/fraxtalTestnet'
import {fraxtal} from './eip155/fraxtal'
import {funkiSepolia} from './eip155/funkiSepolia'
import {fuseSparknet} from './eip155/fuseSparknet'
import {fuse} from './eip155/fuse'
import {gnosisChiado} from './eip155/gnosisChiado'
import {gnosis} from './eip155/gnosis'
import {gobi} from './eip155/gobi'
import {goerli} from './eip155/goerli'
import {haqqMainnet} from './eip155/haqqMainnet'
import {haqqTestedge2} from './eip155/haqqTestedge2'
import {hardhat} from './eip155/hardhat'
import {harmonyOne} from './eip155/harmonyOne'
import {hederaPreviewnet} from './eip155/hederaPreviewnet'
import {hederaTestnet} from './eip155/hederaTestnet'
import {hedera} from './eip155/hedera'
import {holesky} from './eip155/holesky'
import {immutableZkEvmTestnet} from './eip155/immutableZkEvmTestnet'
import {immutableZkEvm} from './eip155/immutableZkEvm'
import {inEVM} from './eip155/inEVM'
import {iotexTestnet} from './eip155/iotexTestnet'
import {iotex} from './eip155/iotex'
import {jbcTestnet} from './eip155/jbcTestnet'
import {jbc} from './eip155/jbc'
import {kakarotSepolia} from './eip155/kakarotSepolia'
import {karura} from './eip155/karura'
import {kavaTestnet} from './eip155/kavaTestnet'
import {kava} from './eip155/kava'
import {kcc} from './eip155/kcc'
import {klaytnBaobab} from './eip155/klaytnBaobab'
import {klaytn} from './eip155/klaytn'
import {kromaSepolia} from './eip155/kromaSepolia'
import {kroma} from './eip155/kroma'
import {l3xTestnet} from './eip155/l3xTestnet'
import {l3x} from './eip155/l3x'
import {lightlinkPegasus} from './eip155/lightlinkPegasus'
import {lightlinkPhoenix} from './eip155/lightlinkPhoenix'
import {lineaGoerli} from './eip155/lineaGoerli'
import {lineaSepolia} from './eip155/lineaSepolia'
import {lineaTestnet} from './eip155/lineaTestnet'
import {linea} from './eip155/linea'
import {liskSepolia} from './eip155/liskSepolia'
import {lisk} from './eip155/lisk'
import {localhost} from './eip155/localhost'
import {luksoTestnet} from './eip155/luksoTestnet'
import {lukso} from './eip155/lukso'
import {mainnet} from './eip155/mainnet'
import {mandala} from './eip155/mandala'
import {mantaSepoliaTestnet} from './eip155/mantaSepoliaTestnet'
import {mantaTestnet} from './eip155/mantaTestnet'
import {manta} from './eip155/manta'
import {mantleSepoliaTestnet} from './eip155/mantleSepoliaTestnet'
import {mantleTestnet} from './eip155/mantleTestnet'
import {mantle} from './eip155/mantle'
import {merlin} from './eip155/merlin'
import {metachainIstanbul} from './eip155/metachainIstanbul'
import {metachain} from './eip155/metachain'
import {metalL2} from './eip155/metalL2'
import {meterTestnet} from './eip155/meterTestnet'
import {meter} from './eip155/meter'
import {metisGoerli} from './eip155/metisGoerli'
import {metis} from './eip155/metis'
import {mevTestnet} from './eip155/mevTestnet'
import {mev} from './eip155/mev'
import {mintSepoliaTestnet} from './eip155/mintSepoliaTestnet'
import {modeTestnet} from './eip155/modeTestnet'
import {mode} from './eip155/mode'
import {moonbaseAlpha} from './eip155/moonbaseAlpha'
import {moonbeamDev} from './eip155/moonbeamDev'
import {moonbeam} from './eip155/moonbeam'
import {moonriver} from './eip155/moonriver'
import {morphSepolia} from './eip155/morphSepolia'
import {nautilus} from './eip155/nautilus'
import {neonDevnet} from './eip155/neonDevnet'
import {neonMainnet} from './eip155/neonMainnet'
import {nexilix} from './eip155/nexilix'
import {nexi} from './eip155/nexi'
import {oasisTestnet} from './eip155/oasisTestnet'
import {oasys} from './eip155/oasys'
import {okc} from './eip155/okc'
import {opBNBTestnet} from './eip155/opBNBTestnet'
import {opBNB} from './eip155/opBNB'
import {optimismGoerli} from './eip155/optimismGoerli'
import {optimismSepolia} from './eip155/optimismSepolia'
import {optimism} from './eip155/optimism'
import {otimDevnet} from './eip155/otimDevnet'
import {palmTestnet} from './eip155/palmTestnet'
import {palm} from './eip155/palm'
import {pgnTestnet} from './eip155/pgnTestnet'
import {pgn} from './eip155/pgn'
import {phoenix} from './eip155/phoenix'
import {playfiAlbireo} from './eip155/playfiAlbireo'
import {plinga} from './eip155/plinga'
import {plumeTestnet} from './eip155/plumeTestnet'
import {polygonAmoy} from './eip155/polygonAmoy'
import {polygonMumbai} from './eip155/polygonMumbai'
import {polygon} from './eip155/polygon'
import {polygonZkEvmCardona} from './eip155/polygonZkEvmCardona'
import {polygonZkEvmTestnet} from './eip155/polygonZkEvmTestnet'
import {polygonZkEvm} from './eip155/polygonZkEvm'
import {pulsechain} from './eip155/pulsechain'
import {pulsechainV4} from './eip155/pulsechainV4'
import {qMainnet} from './eip155/qMainnet'
import {qTestnet} from './eip155/qTestnet'
import {reyaNetwork} from './eip155/reyaNetwork'
import {rolluxTestnet} from './eip155/rolluxTestnet'
import {rollux} from './eip155/rollux'
import {ronin} from './eip155/ronin'
import {rootstockTestnet} from './eip155/rootstockTestnet'
import {rootstock} from './eip155/rootstock'
import {rss3Sepolia} from './eip155/rss3Sepolia'
import {rss3} from './eip155/rss3'
import {saigon} from './eip155/saigon'
import {sapphireTestnet} from './eip155/sapphireTestnet'
import {sapphire} from './eip155/sapphire'
import {scrollSepolia} from './eip155/scrollSepolia'
import {scroll} from './eip155/scroll'
import {seiDevnet} from './eip155/seiDevnet'
import {sepolia} from './eip155/sepolia'
import {shardeumSphinx} from './eip155/shardeumSphinx'
import {shibarium} from './eip155/shibarium'
import {shimmerTestnet} from './eip155/shimmerTestnet'
import {shimmer} from './eip155/shimmer'
import {songbirdTestnet} from './eip155/songbirdTestnet'
import {songbird} from './eip155/songbird'
import {spicy} from './eip155/spicy'
import {stratis} from './eip155/stratis'
import {syscoinTestnet} from './eip155/syscoinTestnet'
import {syscoin} from './eip155/syscoin'
import {taikoHekla} from './eip155/taikoHekla'
import {taikoJolnir} from './eip155/taikoJolnir'
import {taikoKatla} from './eip155/taikoKatla'
import {taikoTestnetSepolia} from './eip155/taikoTestnetSepolia'
import {taraxaTestnet} from './eip155/taraxaTestnet'
import {taraxa} from './eip155/taraxa'
import {telcoinTestnet} from './eip155/telcoinTestnet'
import {telosTestnet} from './eip155/telosTestnet'
import {telos} from './eip155/telos'
import {tenet} from './eip155/tenet'
import {thaiChain} from './eip155/thaiChain'
import {thunderTestnet} from './eip155/thunderTestnet'
import {vechain} from './eip155/vechain'
import {wanchainTestnet} from './eip155/wanchainTestnet'
import {wanchain} from './eip155/wanchain'
import {wemixTestnet} from './eip155/wemixTestnet'
import {wemix} from './eip155/wemix'
import {xdcTestnet} from './eip155/xdcTestnet'
import {xdc} from './eip155/xdc'
import {xLayerTestnet} from './eip155/xLayerTestnet'
import {xLayer} from './eip155/xLayer'
import {yooldoVerseTestnet} from './eip155/yooldoVerseTestnet'
import {yooldoVerse} from './eip155/yooldoVerse'
import {zetachainAthensTestnet} from './eip155/zetachainAthensTestnet'
import {zetachain} from './eip155/zetachain'
import {zhejiang} from './eip155/zhejiang'
import {zilliqaTestnet} from './eip155/zilliqaTestnet'
import {zilliqa} from './eip155/zilliqa'
import {zkFairTestnet} from './eip155/zkFairTestnet'
import {zkFair} from './eip155/zkFair'
import {zkSyncInMemoryNode} from './eip155/zkSyncInMemoryNode'
import {zkSyncLocalNode} from './eip155/zkSyncLocalNode'
import {zkSyncSepoliaTestnet} from './eip155/zkSyncSepoliaTestnet'
import {zkSyncTestnet} from './eip155/zkSyncTestnet'
import {zkSync} from './eip155/zkSync'
import {zoraSepolia} from './eip155/zoraSepolia'
import {zoraTestnet} from './eip155/zoraTestnet'
import {zora} from './eip155/zora'
import {near, neartestnet} from "./near";


export const ALL_CHAINS: Chain[] = [
	acala,
	ancient8Sepolia,
	ancient8,
	anvil,
	apexTestnet,
	arbitrumGoerli,
	arbitrumNova,
	arbitrumSepolia,
	arbitrum,
	areonNetworkTestnet,
	areonNetwork,
	astar,
	astarZkEVM,
	astarZkyoto,
	auroraTestnet,
	aurora,
	auroria,
	avalancheFuji,
	avalanche,
	bahamut,
	baseGoerli,
	baseSepolia,
	base,
	beamTestnet,
	beam,
	bearNetworkChainMainnet,
	bearNetworkChainTestnet,
	berachainTestnet,
	bevmMainnet,
	bitTorrentTestnet,
	bitTorrent,
	blastSepolia,
	blast,
	boba,
	bob,
	bronosTestnet,
	bronos,
	bscGreenfield,
	bscTestnet,
	bsc,
	btrTestnet,
	btr,
	bxnTestnet,
	bxn,
	canto,
	celoAlfajores,
	celo,
	chiliz,
	classic,
	confluxESpaceTestnet,
	confluxESpace,
	coreDao,
	cronosTestnet,
	cronos,
	crossbell,
	cyberTestnet,
	cyber,
	darwinia,
	defichainEvmTestnet,
	defichainEvm,
	degen,
	dfk,
	dodochainTestnet,
	dogechain,
	dreyerxMainnet,
	edgelessTestnet,
	edgeless,
	edgewareTestnet,
	edgeware,
	ektaTestnet,
	ekta,
	eon,
	eosTestnet,
	eos,
	etherlinkTestnet,
	eth,
	evmosTestnet,
	evmos,
	fantomSonicTestnet,
	fantomTestnet,
	fantom,
	fibo,
	filecoinCalibration,
	filecoinHyperspace,
	filecoin,
	flareTestnet,
	flare,
	flowMainnet,
	flowPreviewnet,
	flowTestnet,
	foundry,
	fraxtalTestnet,
	fraxtal,
	funkiSepolia,
	fuseSparknet,
	fuse,
	gnosisChiado,
	gnosis,
	gobi,
	goerli,
	haqqMainnet,
	haqqTestedge2,
	hardhat,
	harmonyOne,
	hederaPreviewnet,
	hederaTestnet,
	hedera,
	holesky,
	immutableZkEvmTestnet,
	immutableZkEvm,
	inEVM,
	iotexTestnet,
	iotex,
	jbcTestnet,
	jbc,
	kakarotSepolia,
	karura,
	kavaTestnet,
	kava,
	kcc,
	klaytnBaobab,
	klaytn,
	kromaSepolia,
	kroma,
	l3xTestnet,
	l3x,
	lightlinkPegasus,
	lightlinkPhoenix,
	lineaGoerli,
	lineaSepolia,
	lineaTestnet,
	linea,
	liskSepolia,
	lisk,
	localhost,
	luksoTestnet,
	lukso,
	mainnet,
	mandala,
	mantaSepoliaTestnet,
	mantaTestnet,
	manta,
	mantleSepoliaTestnet,
	mantleTestnet,
	mantle,
	merlin,
	metachainIstanbul,
	metachain,
	metalL2,
	meterTestnet,
	meter,
	metisGoerli,
	metis,
	mevTestnet,
	mev,
	mintSepoliaTestnet,
	modeTestnet,
	mode,
	moonbaseAlpha,
	moonbeamDev,
	moonbeam,
	moonriver,
	morphSepolia,
	nautilus,
	neonDevnet,
	neonMainnet,
	nexilix,
	nexi,
	oasisTestnet,
	oasys,
	okc,
	opBNBTestnet,
	opBNB,
	optimismGoerli,
	optimismSepolia,
	optimism,
	otimDevnet,
	palmTestnet,
	palm,
	pgnTestnet,
	pgn,
	phoenix,
	playfiAlbireo,
	plinga,
	plumeTestnet,
	polygonAmoy,
	polygonMumbai,
	polygon,
	polygonZkEvmCardona,
	polygonZkEvmTestnet,
	polygonZkEvm,
	pulsechain,
	pulsechainV4,
	qMainnet,
	qTestnet,
	reyaNetwork,
	rolluxTestnet,
	rollux,
	ronin,
	rootstockTestnet,
	rootstock,
	rss3Sepolia,
	rss3,
	saigon,
	sapphireTestnet,
	sapphire,
	scrollSepolia,
	scroll,
	seiDevnet,
	sepolia,
	shardeumSphinx,
	shibarium,
	shimmerTestnet,
	shimmer,
	songbirdTestnet,
	songbird,
	spicy,
	stratis,
	syscoinTestnet,
	syscoin,
	taikoHekla,
	taikoJolnir,
	taikoKatla,
	taikoTestnetSepolia,
	taraxaTestnet,
	taraxa,
	telcoinTestnet,
	telosTestnet,
	telos,
	tenet,
	thaiChain,
	thunderTestnet,
	vechain,
	wanchainTestnet,
	wanchain,
	wemixTestnet,
	wemix,
	xdcTestnet,
	xdc,
	xLayerTestnet,
	xLayer,
	yooldoVerseTestnet,
	yooldoVerse,
	zetachainAthensTestnet,
	zetachain,
	zhejiang,
	zilliqaTestnet,
	zilliqa,
	zkFairTestnet,
	zkFair,
	zkSyncInMemoryNode,
	zkSyncLocalNode,
	zkSyncSepoliaTestnet,
	zkSyncTestnet,
	zkSync,
	zoraSepolia,
	zoraTestnet,
	zora,

// NON EVM
	cosmos,
	solana,
	solanadev,
	near,
	neartestnet
];

export const CHAINS: Map<string, Chain> = new Map(
	ALL_CHAINS.map((item) => [item.id, item])
);


export const DEVX_CHAINS: Chain[] = [
	sepolia,
	solanadev,
];

export const SANDBOX_CHAINS: Chain[] = ALL_CHAINS.filter((c) => c.vchain.testnet);
export const MAIN_CHAINS: Chain[] = ALL_CHAINS.filter((c) => !c.vchain.testnet);
