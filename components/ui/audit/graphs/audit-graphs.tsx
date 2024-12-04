import { getOddjobPaymentsByRole } from "@/actions/getOddjobPayments"
import { getTreasuries } from "@/actions/getTreasuryHistory"
import { getTreasuryValues } from "@/actions/getTreasuryValues"

import { OddjobByRoles } from "./oddjob/oddjob-by-roles"
import { TreasuryGraph } from "./treasury/treasury-graph"

export const revalidate = 43200

export default async function PageAuditCharts() {
  const treasuries = await getTreasuryValues()
  const totalOddJobPayments = await getOddjobPaymentsByRole()

  console.log("treasuries", treasuries)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <TreasuryGraph treasuries={treasuries} />
      <OddjobByRoles totalOddJobPayments={totalOddJobPayments} />
    </div>
  )
}
