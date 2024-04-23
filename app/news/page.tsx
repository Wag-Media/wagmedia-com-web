import {
  getCategories,
  getCategoriesWithPosts,
  getNonEnglishCategories,
} from "@/data/dbCategories"

import SectionMagazine11Wag from "@/components/Sections/SectionMagazine11Wag"

export default async function PageNews() {
  const categories = await getNonEnglishCategories("news")
  const categoriesWithPosts = await getCategoriesWithPosts(categories, "news")

  return (
    <div className="container relative">
      <SectionMagazine11Wag
        categories={categoriesWithPosts}
        className="py-16 lg:py-24"
        heading="Explore all Polkadot News Categories"
        desc="Polkadot Ecosystem News grouped by Category"
      />
    </div>
  )
}
