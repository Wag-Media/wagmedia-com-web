import { getCategoryOverview } from "@/data/dbCategories"
import { ContentType } from "@prisma/client"

import CategoryOverview from "@/components/Sections/CategoryOverview"

export const metadata = {
  title: "Polkadot News",
  description:
    "Latest news on Polkadot and the Web3 ecosystem. Stay up to date with the latest Polkadot news and updates.",
}

export default async function PageNews() {
  const categories = await getCategoryOverview(ContentType.news)

  return (
    <div className="container relative">
      <CategoryOverview
        categories={categories}
        className="py-16 lg:py-24"
        heading="All the Polkadot News Uncovered by our Finders Program"
        desc="Polkadot Ecosystem news grouped by category"
        contentType={ContentType.news}
      />
    </div>
  )
}
