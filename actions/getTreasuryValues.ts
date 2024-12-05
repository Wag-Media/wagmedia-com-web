import { unstable_cache } from "next/cache"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { formatDate } from "date-fns"
import { Chain, createPublicClient, http } from "viem"
import { base, mainnet } from "viem/chains"

import "@polkadot/rpc-augment"
import { parseLiquidityPositions, parseNfts } from "./util"

const TREASURY_WAGMEDIA = "5FxPyre3YbJ4EsMwnD8vQeohUQYQ6AMpY83HD1NvDvyJ7FiE"
const TREASURY_WAGMEDIA_MULTISIG =
  "1nk1zBjum3dr6Y1YAx6Uqr6Worx5rSYJtu9iq5v5gyTFzCL"
const TREASURY_WAGMEDIA_EVM = "0xC24061804be38E41c5Cc4bB391A20f4e494A566d"
const TREASURY_HYDRA = "7MVFQh1WchfKX6rgoPcRLaPd3bYaF1akVsg38MtEwtTY29JF"
const WSS_HYDRA = "wss://hydradx.paras.ibp.network"

const SUBSCAN_POLKADOT = "https://polkadot.api.subscan.io"
const SUBSCAN_ASSET_HUB = "https://assethub-polkadot.api.subscan.io"

// USDC contract addresses on various blockchains
const usdcAddresses: Record<number, `0x${string}`> = {
  [base.id]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  [mainnet.id]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
}

const USDC_DECIMALS = 6

// Define the ABI for the ERC20 `balanceOf` function
const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
] as const

/**
 * Get the current USD value of the treasury
 *
 * treasury - ah -usdc
 * treasury - relay - dot
 * treasury - Hydra - dot
 * multisig - relay - dot
 * treasury - ETH - ETH + USDC
 * treasury - BASE - ETH + USDC
 *
 */
export const getTreasuryValues = async () => {
  const currentTime = new Date()

  const [treasuryAH, hydra, ethTreasuryMainnet, ethTreasuryBase] =
    await Promise.all([
      getSubscanAssets("assethub", TREASURY_WAGMEDIA),
      getHydraPoolBalance(),
      getEthTreasuryBalance({ chain: mainnet }),
      getEthTreasuryBalance({ chain: base }),
    ])

  const treasuryPolkadot = await getSubscanAssets("polkadot", TREASURY_WAGMEDIA)

  const multisigAH = await getSubscanAssets(
    "assethub",
    TREASURY_WAGMEDIA_MULTISIG
  )

  const multisigPolkadot = await getSubscanAssets(
    "polkadot",
    TREASURY_WAGMEDIA_MULTISIG
  )

  const totalTreasuryAH = calculateTotalValue(treasuryAH)
  const totalTreasuryPolkadot = calculateTotalValue(treasuryPolkadot)
  const totalMultisigAH = calculateTotalValue(multisigAH)
  const totalMultisigPolkadot = calculateTotalValue(multisigPolkadot)

  const DOTprice = treasuryPolkadot.native.find(
    (item) => item.symbol === "DOT"
  )?.price
  const totalHydra = hydra.DOTamount * Number(DOTprice)

  return {
    currentTime,
    totalUSD:
      totalTreasuryAH +
      totalTreasuryPolkadot +
      totalMultisigAH +
      totalMultisigPolkadot +
      totalHydra +
      ethTreasuryMainnet.totalUSD +
      ethTreasuryBase.totalUSD,
    eth: {
      address: TREASURY_WAGMEDIA_EVM,
      mainnet: {
        ...ethTreasuryMainnet,
        url: `https://etherscan.io/address/${TREASURY_WAGMEDIA_EVM}`,
      },
      base: {
        ...ethTreasuryBase,
        url: `https://basescan.org/address/${TREASURY_WAGMEDIA_EVM}`,
      },
    },
    hydra: {
      totalUSD: totalHydra,
      address: TREASURY_HYDRA,
      url: `https://app.hydration.net/liquidity/my-liquidity?account=${TREASURY_HYDRA}&id=5`,
      ...hydra,
    },
    treasuryAH: {
      totalUSD: totalTreasuryAH,
      address: TREASURY_WAGMEDIA,
      url: `${SUBSCAN_ASSET_HUB}/account/${TREASURY_WAGMEDIA}`,
      ...treasuryAH,
    },
    treasuryPolkadot: {
      totalUSD: totalTreasuryPolkadot,
      address: TREASURY_WAGMEDIA,
      url: `${SUBSCAN_POLKADOT}/account/${TREASURY_WAGMEDIA}`,
      ...treasuryPolkadot,
    },
    multisigAH: {
      totalUSD: totalMultisigAH,
      address: TREASURY_WAGMEDIA_MULTISIG,
      url: `${SUBSCAN_ASSET_HUB}/account/${TREASURY_WAGMEDIA_MULTISIG}`,
      ...multisigAH,
    },
    multisigPolkadot: {
      totalUSD: totalMultisigPolkadot,
      address: TREASURY_WAGMEDIA_MULTISIG,
      url: `${SUBSCAN_POLKADOT}/account/${TREASURY_WAGMEDIA_MULTISIG}`,
      ...multisigPolkadot,
    },
  }
}

async function getHydraPoolBalance() {
  return {
    DOTamount: 20000,
  }

  const provider = new WsProvider(WSS_HYDRA)
  const api = await ApiPromise.create({ provider })

  const [omnipoolNftId, miningNftId, xykMiningNftId] = await Promise.all([
    api.consts.omnipool.nftCollectionId,
    api.consts.omnipoolLiquidityMining.nftCollectionId,
    api.consts.xykLiquidityMining.nftCollectionId,
  ])
  const [miningNftsRaw] = await Promise.all([
    // api.query.uniques.account.entries(TREASURY_HYDRA, omnipoolNftId),
    api.query.uniques.account.entries(TREASURY_HYDRA, miningNftId),
    // api.query.uniques.account.entries(TREASURY_HYDRA, xykMiningNftId),
  ])

  // const omnipoolNfts = parseNfts(omnipoolNftsRaw as any)
  const miningNfts = parseNfts(miningNftsRaw as any)
  // const xykMiningNfts = parseNfts(xykMiningNftsRaw as any)

  // const omnipoolKeys = miningNfts.map((nft) =>
  //   api.query.omnipoolWarehouseLM.deposit.key(nft.instanceId)
  // )

  const omniPositionIdsRaw =
    await api.query.omnipoolLiquidityMining.omniPositionId.multi(
      miningNfts.map((nft) => nft.instanceId)
    )

  const omniPositionIds = omniPositionIdsRaw.map((id) => id.toString())

  const depositLiquidityPositions = parseLiquidityPositions(
    await api.query.omnipool.positions.multi(omniPositionIds),
    omniPositionIds,
    miningNfts.map((nft) => ({ depositId: nft.instanceId }))
  )

  const position0 = depositLiquidityPositions[0]

  return {
    DOTamount: Number(position0.amount) / 1e10,
    raw: position0,
  }
}

/**
 * Get the balance of the Wagmedia ETH treasury in ETH only
 * @param blockNumber Optional block number to get the balance at
 * @returns Balance of the Wagmedia ETH treasury
 */
async function getEthTreasuryBalance({
  blockNumber,
  date,
  chain,
}: {
  blockNumber?: bigint
  date?: string
  chain?: Chain
}): Promise<{ ethBalance: number; usdcBalance: number; totalUSD: number }> {
  if (!chain) {
    chain = mainnet
  }

  const client = createPublicClient({
    chain,
    transport: http(),
  })

  if (!blockNumber && !date) {
    const currentBlock = await client.getBlockNumber()
    blockNumber = currentBlock
  } else if (date) {
    blockNumber = estimateBlockNumberAtDate(new Date(date))
  }

  const ethBalance = await client.getBalance({
    address: TREASURY_WAGMEDIA_EVM,
    blockNumber: blockNumber,
  })

  const chains = [mainnet.id, base.id]

  const ethUsdRate = await getEthUsdRate()

  const usdcContractAddress: `0x${string}` =
    usdcAddresses[chain.id as keyof typeof usdcAddresses]

  const usdcBalance = (await client.readContract({
    address: usdcContractAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [TREASURY_WAGMEDIA_EVM],
    blockNumber: blockNumber,
  })) as unknown as bigint

  return {
    ethBalance: Number(ethBalance.toString()) / 10 ** 18,
    usdcBalance: usdcBalance
      ? Number(usdcBalance.toString()) / 10 ** USDC_DECIMALS
      : 0,
    totalUSD:
      (Number(ethBalance.toString()) / 10 ** 18) * ethUsdRate +
      (usdcBalance ? Number(usdcBalance.toString()) / 10 ** USDC_DECIMALS : 0),
  }
}

function calculateTotalValue(data: {
  native: {
    balance: string
    price: string
    decimals: number
    symbol: string
  }[]
  assets?: {
    balance: string
    price?: string
    decimals: number
    symbol: string
  }[]
}): number {
  const totalNativeValue = data?.native
    ? data?.native?.reduce((acc, item) => {
        const balance = Number(item.balance) / Math.pow(10, item.decimals)
        const price = Number(item.price)
        return acc + balance * price
      }, 0)
    : 0

  const totalAssetsValue = data?.assets
    ? data.assets.reduce((acc, item) => {
        if (item.price || item.symbol.includes("USD")) {
          const balance = Number(item.balance) / Math.pow(10, item.decimals)
          const price = Number(item.price) || 1
          return acc + balance * price
        }
        return acc
      }, 0)
    : 0

  return totalNativeValue + totalAssetsValue
}

async function getSubscanAssets(
  chain: "polkadot" | "assethub",
  address: string
): Promise<{
  native: {
    symbol: string
    unique_id: string
    balance: string
    decimals: number
    price: string
  }[]
  assets: {
    symbol: string
    decimals: number
    balance: string
    price?: string
  }[]
}> {
  const data = await querySubscan(chain, "api/scan/account/tokens", {
    address,
  })

  return data
}

async function querySubscan(
  chain: "polkadot" | "assethub",
  endpoint: string,
  body: any
) {
  const apiKey = process.env.SUBSCAN_API_KEY || ""

  const endpointUrl =
    chain === "polkadot" ? SUBSCAN_POLKADOT : SUBSCAN_ASSET_HUB

  const response = await fetch(`${endpointUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return data?.data
}

async function getTreasuryData(address: string) {
  const apiKey = process.env.SUBSCAN_API_KEY || ""

  const historyEnd = formatDate(new Date(), "yyyy-MM-dd")
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 30)
  const historyStart = formatDate(startDate, "yyyy-MM-dd")

  const balanceHistory = await fetch(
    "https://polkadot.api.subscan.io/api/scan/multiChain/balance_value_history",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        address,
        start: historyStart,
        end: historyEnd,
      }),
    }
  )

  const balanceHistoryData = await balanceHistory.json()
  return balanceHistoryData?.data
}

function estimateBlockNumberAtDate(date: Date): bigint {
  // Reference block number and timestamp (e.g., a known block number and its timestamp)
  const referenceBlockNumber = BigInt(21000000) // Example block number
  const referenceTimestamp = 1729345547 // Example timestamp in seconds (e.g., 2023-10-01)

  const targetTimestamp = Math.floor(date.getTime() / 1000)
  const secondsDifference = targetTimestamp - referenceTimestamp
  const averageBlockTime = 12.1 // Average block time in seconds

  const estimatedBlocksSinceReference = Math.floor(
    secondsDifference / averageBlockTime
  )
  const estimatedBlockNumber =
    referenceBlockNumber + BigInt(estimatedBlocksSinceReference)

  return estimatedBlockNumber
}

async function getEthUsdRate() {
  // Fetch the current ETH to USD exchange rate
  const response = await fetch(
    "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=" +
      process.env.ETHERSCAN_API_KEY
  )
  const data = await response.json()
  const ethToUsdRate = data?.result?.ethusd

  return ethToUsdRate
}
