"use client"

import Link from "next/link"
import { User } from "@prisma/client"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import { slugify } from "@/lib/slug"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar } from "@/components/Avatar/Avatar"

interface SearchResultsProps {
  isLoading: boolean
  query?: string
  results?: {
    posts: any[]
    authors: any[]
    categories: any[]
  }
  onClose: () => void
}

export function SearchResults({
  isLoading,
  query,
  results,
  onClose,
}: SearchResultsProps) {
  if (isLoading) return <SearchResultsSkeleton query={query} />
  if (
    !results ||
    (results.posts.length === 0 &&
      results.authors.length === 0 &&
      results.categories.length === 0)
  )
    return (
      <div className="px-6 text-sm text-center py-14 sm:px-14">
        <ExclamationTriangleIcon
          className="w-6 h-6 mx-auto text-gray-400"
          aria-hidden="true"
        />
        <p className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
          No results found
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          We couldn’t find anything with that term. Please try again.
        </p>
      </div>
    )

  const { posts, authors, categories } = results

  return (
    <div className="overflow-y-auto max-h-[400px] text-sm">
      {posts?.length > 0 && (
        <div className="mb-2">
          <h3 className="mb-2 text-sm font-medium">Posts</h3>
          <div className="space-y-0.5 mx-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                onClick={onClose}
                className="block w-full px-2 py-1 text-left rounded-md hover:bg-accent"
              >
                {post.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {authors?.length > 0 && (
        <div className="mb-2">
          <h3 className="mb-2 text-sm font-medium">Authors</h3>
          <div className="mx-2 space-y-1">
            {authors.map((author: User) => (
              <Link
                key={author.id}
                href={`/creator/${author.name}`}
                onClick={onClose}
                className="flex items-center w-full gap-2 px-2 py-1 text-left rounded-md hover:bg-accent"
              >
                <Avatar
                  imgUrl={author.avatar || ""}
                  userName={author.name || ""}
                />
                {author.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {categories?.length > 0 && (
        <div className="mb-2">
          <h3 className="mb-2 text-sm font-medium">Categories</h3>
          <div className="mx-2 space-y-1">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${slugify(category.name)}`}
                onClick={onClose}
                className="block w-full px-2 py-1 text-left rounded-md hover:bg-accent"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SearchResultsSkeleton({ query }: { query?: string }) {
  // Determine which sections to show based on the prefix
  const prefix = query?.charAt(0)
  let sectionsToShow: string[] = ["Posts", "Authors", "Categories"]

  switch (prefix) {
    case "#":
    case ">":
      sectionsToShow = ["Posts"]
      break
    case "@":
      sectionsToShow = ["Authors"]
      break
    case ".":
      sectionsToShow = ["Categories"]
      break
  }

  return (
    <div className="space-y-4">
      {sectionsToShow.map((section) => (
        <div key={section}>
          <h3 className="mb-2 text-sm font-medium">{section}</h3>
          <div className="space-y-1">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="w-full h-6" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
