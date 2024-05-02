import { cn } from "@/lib/utils"
import Heading from "@/components/Heading/Heading"

export default function Loading() {
  const tabs = ["Posts", "Management"]

  return (
    <>
      <Heading desc="See where all the payments go">Audit</Heading>
      <div className="mb-12">
        {tabs.map((tab, idx) => (
          <a
            key={tab}
            href={`/audit/${tab.toLowerCase()}`}
            className={cn(
              "py-2 !mr-4 text-3xl font-semibold border-b-4 rounded-none cursor-pointer",
              {
                "border-black": idx === 0,
                "border-transparent": idx !== 0,
              }
            )}
          >
            {tab}
          </a>
        ))}
      </div>
      <div className="mt-8">Loading Audit Data...</div>
    </>
  )
}
