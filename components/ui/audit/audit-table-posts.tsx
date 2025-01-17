import { getPostPaymentsGroupedByPostId } from "@/actions/getPostPayments"

import { AuditTablePostsDisplay } from "./audit-table-posts-display"

export async function AuditTablePosts() {
  return <AuditTablePostsDisplay />
}
