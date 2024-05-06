import { Suspense } from "react"

import { cn } from "@/lib/utils"
import { AuditTableOddjobs } from "@/components/ui/audit/audit-table-oddjobs"
import { AuditTablePosts } from "@/components/ui/audit/audit-table-posts"

export const fetchCache = "force-no-store"
export const revalidate = 10 // seconds
export const dynamic = "force-dynamic"

export const metadata = {
  title: "Audit",
  description: "See where all WagMedia payments go",
}

export default async function AuditPage({
  params,
}: {
  params: { tab: string[] }
}) {
  const selectedTab: string = params.tab ? params.tab[0] : "posts"
  console.log("selectedTab:", selectedTab)

  // console.log("groupedByPostId", groupedByPostId)

  const tabs = ["Posts", "Management"]

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

      {/* <h2 className="">{selectedTab}</h2>



      <AuditTablePosts postPayments={groupedPaymentsArray} />

      <h2>Odd Job Payments</h2>
      <AuditTableOddjobs oddjobPayments={oddjobPayments} /> */}
    </div>
  )
}
