import {
  getCategories,
  getCategoriesWithPosts,
  getCategoryOverview,
  getNonEnglishCategories,
} from "@/data/dbCategories"
import { ContentType } from "@prisma/client"

import SectionMagazine11Wag from "@/components/Sections/SectionMagazine11Wag"

export default async function PageNews() {
  const categories = await getCategoryOverview(ContentType.news)

  return (
    <div className="container relative">
      <SectionMagazine11Wag
        categories={categories}
        className="py-16 lg:py-24"
        heading="Explore all Polkadot News Categories"
        desc="Polkadot Ecosystem News grouped by Category"
      />
    </div>
  )
}
