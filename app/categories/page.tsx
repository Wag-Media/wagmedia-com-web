import {
  getCategories,
  getCategoriesWithPosts,
  getCategoryOverview,
  getEnglishCategories,
} from "@/data/dbCategories"

import SectionMagazine11Wag from "@/components/Sections/SectionMagazine11Wag"

export const metadata = {
  title: "Article Categories",
  description: "Explore all Polkadot Article Categories",
}

export default async function PageCategories() {
  const categories = await getCategoryOverview()

  // const categoriesWithPosts = await getCategoriesWithPosts(categories)

  return (
    <div className="container relative">
      <SectionMagazine11Wag
        categories={categories}
        className="py-16 lg:py-24"
        heading="Explore curated Polkadot content"
        desc="Our extensive range of categories will help you identify content of interest, enabling you to deepen your understanding of Polkadot."
      />
    </div>
  )
}
