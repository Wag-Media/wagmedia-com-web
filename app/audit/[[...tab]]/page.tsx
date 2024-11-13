import { Suspense } from "react"

import { cn } from "@/lib/utils"
import { AuditTableOddjobs } from "@/components/ui/audit/audit-table-oddjobs"
import { AuditTablePosts } from "@/components/ui/audit/audit-table-posts"
import { AuditGraphs } from "@/components/ui/audit/graphs/AuditGraphs"
import PageAuditCharts from "@/components/ui/audit/graphs/PageAuditCharts"

export const fetchCache = "force-no-store"
export const revalidate = 10 // seconds
export const dynamic = "force-dynamic"

export const metadata = {
  title: "Audit",
  description: "See where all WagMedia payments go",
}

export default async function AuditPage({
  params,
  searchParams,
}: {
  params: { tab: string[] }
  searchParams: Promise<{
    startDate?: string
    endDate?: string
    fundingSource?: string
    page?: string
    pageSize?: string
  }>
}) {
  const selectedTab: string = params.tab ? params.tab[0] : "posts"

  const tabs = ["Posts", "Management", "Charts"]

  if (!selectedTab) {
    return <div>params:{JSON.stringify(params)} Invalid tab</div>
  }

  if (!tabs.map((t) => t.toLowerCase()).includes(selectedTab)) {
    return <div>params:{JSON.stringify(params)} Invalid tab yo</div>
  }

  return (
    <div>
      <div className="mb-12">
        {tabs.map((tab) => (
          <a
            key={tab}
            href={`/audit/${tab.toLowerCase()}`}
            className={cn(
              "py-2 !mr-4 text-3xl font-semibold border-b-4 rounded-none cursor-pointer",
              {
                "border-black dark:border-white":
                  tab.toLowerCase() === selectedTab,
                "border-transparent": tab.toLowerCase() !== selectedTab,
              }
            )}
          >
            {tab}
          </a>
        ))}
      </div>
      {selectedTab === "posts" && (
        <Suspense fallback={<div>Loading Audit Data...</div>}>
          <AuditTablePosts />
        </Suspense>
      )}
      {selectedTab === "management" && (
        <Suspense fallback={<div>Loading Audit Data...</div>}>
          <AuditTableOddjobs />
        </Suspense>
      )}
      {selectedTab === "charts" && (
        <Suspense fallback={<div>Loading Audit Data...</div>}>
          <AuditGraphs />
        </Suspense>
      )}
    </div>
  )
}
