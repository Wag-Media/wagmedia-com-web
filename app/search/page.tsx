import { searchAuthors } from "@/data/dbAuthors"
import { searchCategories } from "@/data/dbCategories"
import { getPosts } from "@/data/dbPosts"

import { SearchInput } from "./search-input"
import { SearchModal } from "./search-modal"
import { SearchResults } from "./search-results"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  //   const posts = await getPosts({
  //     search: q,
  //     contentType: "article",
  //     take: 5,
  //   })
  //   const authors = await searchAuthors(q)
  //   const categories = await searchCategories(q)

  return (
    <div className="max-w-xl mx-auto">
      <SearchModal />
    </div>
  )
}
