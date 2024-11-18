import { getOddjobPaymentsByRole } from "@/actions/getOddjobPayments"

import { AuditGraphs } from "./audit-graphs-display"

export default async function PageAuditCharts() {
  const payments = await getOddjobPaymentsByRole()
  console.log("payments", payments)

  return <AuditGraphs payments={payments} />
}
