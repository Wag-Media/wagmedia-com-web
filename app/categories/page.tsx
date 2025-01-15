import { getCategories, getCategoryOverview } from "@/data/dbCategories"

import CategoryOverview from "@/components/Sections/CategoryOverview"

// revalidate every 30 minutes
export const revalidate = 1800

export const metadata = {
  title: "Explore Curated Polkadot Content from different categories",
  description:
    "Our extensive range of categories will help you identify content of interest, enabling you to deepen your understanding of Polkadot.",
}

export default async function PageCategories() {
  const categories = await getCategoryOverview()

  return (
    <div className="container relative">
      <CategoryOverview
        categories={categories}
        className="py-4 md:py-8 lg:py-16"
        heading="Explore Curated Polkadot Content"
        desc="Our extensive range of categories will help you identify content of interest, enabling you to deepen your understanding of Polkadot."
      />
    </div>
  )
}
