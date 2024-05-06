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

export const metadata = {
  title: "Non-Anglo",
  description:
    "Content in languages other than English: Spanish, French, Chinese, etc.",
}

export default async function PageNonAnglo() {
  const categories = await getNonAngloOverview()

  let languageCategories: Record<
    string,
    {
      id: number
      _count: { posts: number }
      name: string
      posts: any[]
      link?: string
    }
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

      let language = countries[countryCode][1]

      if (language === "Czech Republic") {
        language = "Czech"
      }

      if (!languageCategories[countryName]) {
        languageCategories[countryName] = {
          name: `${flag} ${language}`,
          link: `/category/${language.toLowerCase()}`,
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
        heading="Explore curated non-Anglo Polkadot content"
        desc="Check out all the original non-Anglo content, translations, and dubbed content from our diverse contributors."
      />
    </div>
  )
}
