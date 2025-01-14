import { Suspense } from "react"

import { cn } from "@/lib/utils"
import { AuditTableOddjobs } from "@/components/ui/audit/audit-table-oddjobs"
import { AuditTablePosts } from "@/components/ui/audit/audit-table-posts"
import PageAuditCharts from "@/components/ui/audit/graphs/audit-graphs"

export const fetchCache = "force-no-store"
export const revalidate = 10 // seconds
export const dynamic = "force-dynamic"

export const generateMetadata = ({ params }: { params: { tab: string[] } }) => {
  const selectedTab: string = params.tab ? params.tab[0] : "posts"

  return {
    title: `Audit - ${
      selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)
    }`,
    description: "See where all WagMedia payments go",
  }
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

  const tabs = ["Posts", "Management", "Treasury"]

  if (!selectedTab) {
    return <div>params:{JSON.stringify(params)} Invalid tab</div>
  }

  if (
    ![...tabs, "treasury"].map((t) => t.toLowerCase()).includes(selectedTab)
  ) {
    return <div>params:{JSON.stringify(params)} Invalid tab</div>
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
      {selectedTab === "treasury" && (
        <Suspense fallback={<div>Loading Treasury Charts...</div>}>
          <PageAuditCharts />
        </Suspense>
      )}
    </div>
  )
}
