import { count } from "console"
import {
  getCategories,
  getCategoriesWithPosts,
  getNonAngloOverview,
  getNonEnglishCategories,
} from "@/data/dbCategories"
import { continents, languages } from "countries-list"
import { code, countries, name } from "country-emoji"
import _ from "lodash"

import { getPostFlag } from "@/lib/utils"
import SectionMagazine11Wag from "@/components/Sections/SectionMagazine11Wag"

export default async function PageNonAnglo() {
  const categories = await getNonAngloOverview()

  console.log(countries)

  let languageCategories: Record<
    string,
    { id: number; _count: { posts: number }; name: string; posts: any[] }
  > = {}
  categories.forEach((category) => {
    category.posts.forEach((post) => {
      const flag = getPostFlag(post)

      if (!flag) {
        return
      }

      const countryCode = code(flag)

      const countryName = name(flag)

      if (!countryName || !countryCode) {
        return
      }

      const language = countries[countryCode][1]
      console.log(flag, language)

      if (!languageCategories[countryName]) {
        languageCategories[countryName] = {
          name: `${flag} ${language} Articles`,
          posts: [],
          id: -1,
          _count: {
            posts: 0,
          },
        }
      }

      languageCategories[countryName].posts.push(post)
    })
  })

  for (const key in languageCategories) {
    languageCategories[key]._count.posts = languageCategories[key].posts.length
  }

  const languageCategoriesArray = Object.values(languageCategories)

  languageCategoriesArray.sort((a, b) => b._count.posts - a._count.posts)

  const allCategories = [...languageCategoriesArray]

  return (
    <div className="container relative">
      <SectionMagazine11Wag
        categories={allCategories}
        className="py-16 lg:py-24"
        heading="Explore all Polkadot Non-English Content"
        desc="Read all the original native articles, translations, and dubbed content from WagMedia's native contributors."
      />
    </div>
  )
}
