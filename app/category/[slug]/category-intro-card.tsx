import { categoryDescriptions } from "@/data/category-descriptions"
import { Category } from "@prisma/client"

export default function CategoryIntroCard({
  category,
  articlesCount,
  newsCount,
  isLanguage,
  title,
}: {
  category: Category
  articlesCount: number
  newsCount: number
  isLanguage: boolean
  title: string
}) {
  return (
    <div className="pr-4 text-right">
      <p className="w-full text-gray-600 dark:text-gray-400">
        {category?.name &&
          categoryDescriptions[
            category.name.toLowerCase() as keyof typeof categoryDescriptions
          ]}
      </p>
      <p className="w-full mt-4 text-sm text-gray-600 dark:text-gray-400">{`Read a total of ${articlesCount} articles${
        newsCount ? ` and ${newsCount} news` : ""
      } on Polkadot ${
        isLanguage ? `in ${title}` : category.name
      } written by our community creators`}</p>
    </div>
  )
}
