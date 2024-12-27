import { unstable_cache } from "next/cache"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { formatDate } from "date-fns"
import { createPublicClient, http } from "viem"
import { mainnet } from "viem/chains"

import "@polkadot/rpc-augment"
import { parseLiquidityPositions, parseNfts } from "./util"

const TREASURY_WAGMEDIA = "5FxPyre3YbJ4EsMwnD8vQeohUQYQ6AMpY83HD1NvDvyJ7FiE"
const TREASURY_WAGMEDIA_MULTISIG =
  "1nk1zBjum3dr6Y1YAx6Uqr6Worx5rSYJtu9iq5v5gyTFzCL"
const TREASURY_WAGMEDIA_EVM = "0xC24061804be38E41c5Cc4bB391A20f4e494A566d"
const TREASURY_HYDRA = "7MVFQh1WchfKX6rgoPcRLaPd3bYaF1akVsg38MtEwtTY29JF"
const WSS_HYDRA = "wss://rpc.hydradx.cloud"

const QUICKNODE_URL =
  "https://silent-twilight-yard.quiknode.pro/79f45e1a716fa0427483f7f4aee32845a891f33a"

export const getTreasuries = unstable_cache(
  async () => {
    const account1BalanceHistoryData = await getTreasuryData(TREASURY_WAGMEDIA)
    const account2BalanceHistoryData = await getTreasuryData(
      TREASURY_WAGMEDIA_MULTISIG
    )

    const dateRange = account1BalanceHistoryData?.map((item: any) => item.date)
    const ethUsdRate = await getEthUsdRate()

    console.log("dateRange", dateRange)
    console.log("ethUsdRate", ethUsdRate)

    // const promises = dateRange.map((date: string) =>
    //   getEthTreasuryBalance({ date })
    // )

    // const ethTotal = await Promise.all(promises)
    // const ethTotalInUsd = ethTotal.map((balance) => {
    //   const balanceInUsd = (Number(balance) * Number(ethUsdRate)) / 1e18
    //   return isNaN(balanceInUsd) ? 0 : balanceInUsd.toFixed(2)
    // })

    const hydraBalance = await getHydraPoolBalance()

    const aggregatedData = account1BalanceHistoryData?.map(
      (item: any, index: number) => ({
        date: item.date,
        treasury1: parseFloat(item.value),
        treasury2: parseFloat(account2BalanceHistoryData?.[index]?.value) || 0,
        treasury3: 0,
        treasury4: hydraBalance,
      })
    )

    return {
      usdcTotal: aggregatedData,
    }
  },
  ["treasuries"],
  { revalidate: 43200 }
) // 12 hours in seconds

async function getHydraPoolBalance() {
  const provider = new WsProvider(WSS_HYDRA)
  const api = await ApiPromise.create({ provider })

  // const accountBalance = await api.call.currenciesApi.accounts(TREASURY_HYDRA)

  const [omnipoolNftId, miningNftId, xykMiningNftId] = await Promise.all([
    api.consts.omnipool.nftCollectionId,
    api.consts.omnipoolLiquidityMining.nftCollectionId,
    api.consts.xykLiquidityMining.nftCollectionId,
    // getAccountBalanceData(api, address),
  ])
  const [omnipoolNftsRaw, miningNftsRaw, xykMiningNftsRaw] = await Promise.all([
    api.query.uniques.account.entries(TREASURY_HYDRA, omnipoolNftId),
    api.query.uniques.account.entries(TREASURY_HYDRA, miningNftId),
    api.query.uniques.account.entries(TREASURY_HYDRA, xykMiningNftId),
  ])

  const omnipoolNfts = parseNfts(omnipoolNftsRaw as any)
  const miningNfts = parseNfts(miningNftsRaw as any)
  const xykMiningNfts = parseNfts(xykMiningNftsRaw as any)

  console.log("xykMiningNfts", xykMiningNfts)
  console.log("omnipoolNfts", omnipoolNfts)
  console.log("miningNfts", miningNfts)

  const omnipoolKeys = miningNfts.map((nft) =>
    api.query.omnipoolWarehouseLM.deposit.key(nft.instanceId)
  )

  console.log("omnipoolKeys", omnipoolKeys)

  const omniPositionIdsRaw =
    await api.query.omnipoolLiquidityMining.omniPositionId.multi(
      miningNfts.map((nft) => nft.instanceId)
    )

  // console.log("omniPositionIdsRaw", omniPositionIdsRaw)

  const omniPositionIds = omniPositionIdsRaw.map((id) => id.toString())

  console.log("omniPositionIds", omniPositionIds)

  const depositLiquidityPositions = parseLiquidityPositions(
    await api.query.omnipool.positions.multi(omniPositionIds),
    omniPositionIds,
    miningNfts.map((nft) => ({ depositId: nft.instanceId }))
  )

  console.log("depositLiquidityPositions", depositLiquidityPositions)

  const position0 = depositLiquidityPositions[0]
  // const position0Data = getData(position0)

  // return accountBalance.toJSON()

  // [
  //     [
  //       [
  //         7MVFQh1WchfKX6rgoPcRLaPd3bYaF1akVsg38MtEwtTY29JF
  //         20
  //       ]
  //       {
  //         free: 6,587,437,382,960,485
  //         reserved: 0
  //         frozen: 0
  //       }
  //     ]
  //     [
  //       [
  //         7MVFQh1WchfKX6rgoPcRLaPd3bYaF1akVsg38MtEwtTY29JF
  //         5
  //       ]
  //       {
  //         free: 164,447,516
  //         reserved: 0
  //         frozen: 0
  //       }
  //     ]
  //     [
  //       [
  //         7MVFQh1WchfKX6rgoPcRLaPd3bYaF1akVsg38MtEwtTY29JF
  //         21
  //       ]
  //       {
  //         free: 95,082
  //         reserved: 0
  //         frozen: 0
  //       }
  //     ]
  //     [
  //       [
  //         7MVFQh1WchfKX6rgoPcRLaPd3bYaF1akVsg38MtEwtTY29JF
  //         1,000,120
  //       ]
  //       {
  //         free: 70,000,000,000,000,000
  //         reserved: 0
  //         frozen: 0
  //       }
  //     ]
  //   ]
}

/**
 * Get the balance of the Wagmedia ETH treasury in ETH only
 * @param blockNumber Optional block number to get the balance at
 * @returns Balance of the Wagmedia ETH treasury
 */
async function getEthTreasuryBalance({
  blockNumber,
  date,
}: {
  blockNumber?: bigint
  date?: string
}): Promise<bigint> {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(QUICKNODE_URL),
  })

  if (!blockNumber && !date) {
    const currentBlock = await client.getBlockNumber()
    blockNumber = currentBlock
  } else if (date) {
    blockNumber = estimateBlockNumberAtDate(new Date(date))
  }

  const balance = await client.getBalance({
    address: TREASURY_WAGMEDIA_EVM,
    blockNumber: blockNumber,
  })

  return balance
}

async function getEthTreasuryData(address: string, toBlock?: number) {
  const apiKey = process.env.MORALIS_API_KEY || ""

  //   &to_block=100000
  const balanceHistory = await fetch(
    `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=eth&${
      toBlock ? `to_block=${toBlock}` : ""
    }&exclude_spam=true&exclude_unverified_contracts=true`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    }
  )

  const data = await balanceHistory.json()

  return data
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
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  )
  const data = await response.json()
  const ethToUsdRate = data?.ethereum?.usd

  return ethToUsdRate
}

// get price

// https://assethub-polkadot.api.subscan.io/api/open/price_converter
// {
//   "from": "DOT",
//   "quote": "USD",
//   "value": 100
// . "time": timestamp
// }

// tokens with price
// https://assethub-polkadot.api.subscan.io/api/scan/account/tokens
// https://polkadot.api.subscan.io/api/scan/account/tokens
