import {
  getCategories,
  getCategoriesWithPosts,
  getNonEnglishCategories,
} from "@/data/dbCategories"

import SectionMagazine11Wag from "@/components/Sections/SectionMagazine11Wag"

export default async function PageCategories() {
  const categories = await getNonEnglishCategories()
  const categoriesWithPosts = await getCategoriesWithPosts(categories)

  return (
    <div className="container relative">
      <SectionMagazine11Wag
        categories={categoriesWithPosts}
        className="py-16 lg:py-24"
        heading="Polkadot Article Categories: Your Ultimate Resource for Blockchain Learning"
        desc="Dive into our extensive range of categories to deepen your understanding of Polkadot technology"
      />
    </div>
  )
}
