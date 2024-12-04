import { Null, Option, StorageKey, u128 } from "@polkadot/types"
import { AccountId32 } from "@polkadot/types/interfaces"

import "@polkadot/api-augment"
import {
  PalletLiquidityMiningDepositData,
  PalletOmnipoolPosition,
} from "@polkadot/types/lookup"

export const parseNfts = (
  nfts: [StorageKey<[AccountId32, u128, u128]>, Option<Null>][]
) =>
  nfts.map(([storageKey]) => {
    const [owner, classId, instanceId] = storageKey.args

    return {
      owner: owner.toString(),
      classId: classId.toString(),
      instanceId: instanceId.toString(),
    }
  })

export const parseLiquidityPositions = <T>(
  positions: Option<PalletOmnipoolPosition>[],
  ids: string[],
  metadata?: T[]
) =>
  positions.reduce<
    Array<
      {
        id: string
        assetId: string
        amount: string
        shares: string
        price: string[]
      } & T
    >
  >((acc, pos, i) => {
    if (!pos.isNone) {
      const data = pos.unwrap()

      acc.push({
        id: ids[i],
        amount: data.amount.toString(),
        shares: data.shares.toString(),
        price: data.price.map((e) => e.toString()),
        assetId: data.assetId.toString(),
        ...(metadata ? metadata[i] : ({} as T)),
      })
    }

    return acc
  }, [])
