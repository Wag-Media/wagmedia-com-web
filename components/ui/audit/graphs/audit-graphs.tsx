import { getOddjobPaymentsByRole } from "@/actions/getOddjobPayments"

import { AuditGraphs } from "./audit-graphs-display"

export default async function PageAuditCharts() {
  const totalOddJobPayments = await getOddjobPaymentsByRole()

  return <AuditGraphs totalOddJobPayments={totalOddJobPayments} />
}
